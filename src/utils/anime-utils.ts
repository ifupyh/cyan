import * as fs from "node:fs";
import * as path from "node:path";
import { siteConfig } from "@/config";
import type { StandardizedAnime } from "@/types/anime";

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

interface TmdbItem {
	id: number;
	title?: string;
	name?: string;
	original_title?: string;
	original_name?: string;
	release_date?: string;
	first_air_date?: string;
	media_type?: string;
	poster_path?: string | null;
	vote_average?: number;
	overview?: string;
}

interface BilibiliItem {
	media_id: number;
	title: string;
	cover?: string;
	season_type?: number;
	season_type_name?: string;
	rating?: { score?: number };
	evaluate?: string;
	brief?: string;
	season_id: number;
	new_ep?: { index_show?: string };
}

function readTmdbLocalCache(): TmdbItem[] {
	try {
		const localPath = path.resolve("public/anime-list.json");
		if (fs.existsSync(localPath)) {
			const localData = JSON.parse(fs.readFileSync(localPath, "utf-8"));
			const items = localData.items || localData[0]?.items || [];
			return items;
		}
	} catch {
		// 本地缓存读取失败，忽略
	}
	return [];
}

/**
 * 获取追番数据（TMDB + Bilibili），标准化为 StandardizedAnime[]。
 * 供追番页与「浮光集」聚合页共用。
 */
export async function getAnimeList(): Promise<StandardizedAnime[]> {
	const animeConfig = siteConfig.anime;
	const TMDB_API_KEY = animeConfig?.tmdb?.apiKey;
	const TMDB_LIST_ID = animeConfig?.tmdb?.listId;
	const BILIBILI_UID = animeConfig?.bilibili?.uid;

	// 1. TMDB 数据
	let tmdbItems: TmdbItem[] = [];
	if (TMDB_API_KEY && TMDB_LIST_ID) {
		try {
			const firstResponse = await fetch(
				`https://api.themoviedb.org/3/list/${TMDB_LIST_ID}?api_key=${TMDB_API_KEY}&language=zh-CN&page=1`,
			);

			if (firstResponse.ok) {
				const firstData = await firstResponse.json();
				const totalPages = firstData.total_pages || 1;
				const allItems = [...(firstData.items || [])];

				if (totalPages > 1) {
					const promises: Promise<TmdbItem[]>[] = [];
					for (let page = 2; page <= totalPages; page++) {
						promises.push(
							fetch(
								`https://api.themoviedb.org/3/list/${TMDB_LIST_ID}?api_key=${TMDB_API_KEY}&language=zh-CN&page=${page}`,
							)
								.then((res) => res.json())
								.then((data) => data.items || []),
						);
					}
					const remainingItems = await Promise.all(promises);
					for (const items of remainingItems) {
						allItems.push(...items);
					}
				}

				tmdbItems = allItems;
			} else {
				tmdbItems = readTmdbLocalCache();
			}
		} catch {
			tmdbItems = readTmdbLocalCache();
		}
	}

	// 2. Bilibili 数据（type=1 追番 + type=2 追剧）
	let bilibiliItems: BilibiliItem[] = [];
	if (BILIBILI_UID) {
		try {
			const ps = 30;

			async function fetchBilibiliByType(type: number): Promise<BilibiliItem[]> {
				const items: BilibiliItem[] = [];
				const firstRes = await fetch(
					`https://api.bilibili.com/x/space/bangumi/follow/list?type=${type}&vmid=${BILIBILI_UID}&pn=1&ps=${ps}`,
				);
				const firstJson = await firstRes.json();
				if (firstJson.code !== 0 || !firstJson.data?.list?.length) return items;

				items.push(...firstJson.data.list);
				const total = firstJson.data.total || items.length;
				const totalPages = Math.ceil(total / ps);

				if (totalPages > 1) {
					const promises: Promise<BilibiliItem[]>[] = [];
					for (let pn = 2; pn <= totalPages; pn++) {
						promises.push(
							fetch(
								`https://api.bilibili.com/x/space/bangumi/follow/list?type=${type}&vmid=${BILIBILI_UID}&pn=${pn}&ps=${ps}`,
							)
								.then((r) => r.json())
								.then((j) => j.data?.list || []),
						);
					}
					const remaining = await Promise.all(promises);
					for (const batch of remaining) {
						items.push(...batch);
					}
				}
				return items;
			}

			const [animeItems, dramaItems] = await Promise.all([
				fetchBilibiliByType(1),
				fetchBilibiliByType(2),
			]);
			bilibiliItems = [...animeItems, ...dramaItems];
		} catch {
			// Bilibili 获取失败，忽略
		}
	}

	// 3. 数据标准化
	let animeList: StandardizedAnime[] = tmdbItems.map((anime) => {
		const title = anime.title || anime.name || "";
		const originalTitle = anime.original_title || anime.original_name || "";
		const date = anime.release_date || anime.first_air_date || "";
		const type = anime.media_type || "tv";

		return {
			id: anime.id,
			title,
			originalTitle,
			poster: anime.poster_path ? TMDB_IMG + anime.poster_path : null,
			type: type as "tv" | "movie",
			season_type: type === "movie" ? 2 : 1,
			source: "tmdb",
			rating: anime.vote_average || 0,
			date,
			overview: anime.overview || "",
			link: `https://www.themoviedb.org/${type}/${anime.id}`,
			epStatus: undefined,
		};
	});

	if (bilibiliItems.length > 0) {
		const bilibiliMapped: StandardizedAnime[] = bilibiliItems.map((item) => ({
			id: item.media_id,
			title: item.title,
			originalTitle: item.title,
			poster: item.cover ? item.cover.replace("http://", "https://") : null,
			type: item.season_type === 2 ? ("movie" as const) : ("tv" as const),
			season_type: item.season_type || 1,
			source: "bilibili" as const,
			rating: item.rating?.score || 0,
			date: "",
			overview: item.evaluate || item.brief || "",
			link: `https://www.bilibili.com/bangumi/play/ss${item.season_id}`,
			epStatus: item.new_ep?.index_show || "",
		}));

		// 去重：Bilibili 优先（带进度信息）
		const bilibiliTitles = new Set(bilibiliMapped.map((item) => item.title));
		animeList = animeList.filter((item) => !bilibiliTitles.has(item.title));
		animeList = [...animeList, ...bilibiliMapped];
	}

	return animeList;
}
