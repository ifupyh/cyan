import { siteConfig } from "@/config";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import type {
	UserSubjectCollection,
	UserSubjectCollectionResponse,
} from "@/types/bangumi";

export type BangumiDataResult = {
	bangumiData: Record<string, UserSubjectCollection[]>;
	tabs: Array<{ id: string; name: string; count: number }>;
	fetchFailed: boolean;
	isDynamic: boolean;
	isUserIdConfigured: boolean;
};

/**
 * 获取 Bangumi 收藏数据（静态模式构建时 fetch），供番组计划页与「浮光集」聚合页共用。
 */
export async function getBangumiData(): Promise<BangumiDataResult> {
	const bangumiConfig = {
		username: siteConfig.bangumi?.userId,
		mode: (siteConfig.bangumi?.mode || "static") as "static" | "dynamic",
		apiUrl: siteConfig.bangumi?.apiUrl || "https://api.bangumi.one",
		subjectBaseUrl:
			siteConfig.bangumi?.subjectBaseUrl || "https://bangumi.one/subject/",
		categories: {
			book: true,
			anime: true,
			music: true,
			game: true,
			real: false,
		},
		pagination: {
			limit: 50,
			delay: 50,
			maxTotal: 1000,
		},
	};

	const isDynamic = bangumiConfig.mode === "dynamic";

	const categoryMap: Record<string, { name: string; subjectType: number }> = {
		book: { name: i18n(I18nKey.bangumiCategoryBook), subjectType: 1 },
		anime: { name: i18n(I18nKey.bangumiCategoryAnime), subjectType: 2 },
		music: { name: i18n(I18nKey.bangumiCategoryMusic), subjectType: 3 },
		game: { name: i18n(I18nKey.bangumiCategoryGame), subjectType: 4 },
		real: { name: i18n(I18nKey.bangumiCategoryReal), subjectType: 6 },
	};

	async function fetchBangumiData(
		username: string,
		subjectType: number,
	): Promise<UserSubjectCollection[]> {
		const { limit, delay, maxTotal } = bangumiConfig.pagination;
		let offset = 0;
		let allData: UserSubjectCollection[] = [];
		let hasMore = true;

		const isDev = import.meta.env.DEV;
		const maxPages = isDev ? 1 : 0;

		while (hasMore) {
			if (isDev && maxPages > 0 && allData.length >= limit * maxPages) break;
			if (maxTotal > 0 && allData.length >= maxTotal) break;

			const url = `${bangumiConfig.apiUrl}/v0/users/${username}/collections?subject_type=${subjectType}&limit=${limit}&offset=${offset}`;

			const response = await fetch(url, {
				headers: {
					"User-Agent": "YuuOuRou Blog",
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(
					`[Bangumi] 无法获取数据 (状态码: ${response.status}): ${url}`,
				);
			}

			const data = (await response.json()) as UserSubjectCollectionResponse;
			const currentBatch = data.data || [];

			if (currentBatch.length > 0) {
				allData = allData.concat(currentBatch);
				offset += limit;
				if (currentBatch.length < limit) hasMore = false;
			} else {
				hasMore = false;
			}

			if (hasMore) {
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		return allData;
	}

	const bangumiData: Record<string, UserSubjectCollection[]> = {};
	const tabs: Array<{ id: string; name: string; count: number }> = [];
	let fetchFailed = false;

	const isUserIdConfigured =
		!!bangumiConfig.username &&
		bangumiConfig.username !== "you-user-id" &&
		bangumiConfig.username.trim() !== "";

	if (!isDynamic) {
		for (const [categoryKey, enabled] of Object.entries(
			bangumiConfig.categories,
		)) {
			if (!isUserIdConfigured) break;
			if (enabled && categoryMap[categoryKey as keyof typeof categoryMap]) {
				const categoryInfo =
					categoryMap[categoryKey as keyof typeof categoryMap];
				try {
					const data = await fetchBangumiData(
						// biome-ignore lint/style/noNonNullAssertion: Checked by isUserIdConfigured
						bangumiConfig.username!,
						categoryInfo.subjectType,
					);
					bangumiData[categoryKey] = data;
					tabs.push({
						id: categoryKey,
						name: categoryInfo.name,
						count: data.length,
					});
				} catch {
					fetchFailed = true;
					break;
				}
			}
		}

		// 根据 categoryOrder 配置对 tabs 进行排序
		const categoryOrder = siteConfig.bangumi?.categoryOrder || [];
		if (categoryOrder.length > 0) {
			tabs.sort((a, b) => {
				const aIndex = categoryOrder.indexOf(
					a.id as (typeof categoryOrder)[number],
				);
				const bIndex = categoryOrder.indexOf(
					b.id as (typeof categoryOrder)[number],
				);
				if (aIndex === -1 && bIndex === -1) return 0;
				if (aIndex === -1) return 1;
				if (bIndex === -1) return -1;
				return aIndex - bIndex;
			});
		}
	}

	return { bangumiData, tabs, fetchFailed, isDynamic, isUserIdConfigured };
}
