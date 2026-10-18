import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { interviewConfig } from "@/config/interviewConfig";
import type {
	InterviewCategorySummary,
	InterviewQuestionMeta,
} from "@/types/interview";
import { removeFileExtension } from "@/utils/url-utils";

type InterviewEntry = CollectionEntry<"interview">;

/** 从 entry id 中提取题目 slug（去掉目录前缀与扩展名） */
export function getQuestionSlug(entry: InterviewEntry): string {
	const id = removeFileExtension(entry.id);
	return id.split("/").pop() ?? id;
}

async function getAllQuestions(): Promise<InterviewEntry[]> {
	const questions = await getCollection("interview");
	return questions.sort((a, b) => {
		if (a.data.category !== b.data.category) {
			return a.data.category.localeCompare(b.data.category);
		}
		return (a.data.order ?? 0) - (b.data.order ?? 0);
	});
}

/** 返回固定配置的分类列表，并附上真实题目数量 */
export async function getInterviewCategories(): Promise<
	InterviewCategorySummary[]
> {
	const questions = await getAllQuestions();
	const countMap = new Map<string, number>();
	for (const q of questions) {
		countMap.set(q.data.category, (countMap.get(q.data.category) ?? 0) + 1);
	}
	return interviewConfig.categories.map((cat) => ({
		...cat,
		count: countMap.get(cat.slug) ?? 0,
	}));
}

export function getInterviewCategory(slug: string) {
	return interviewConfig.categories.find((c) => c.slug === slug);
}

export async function getQuestionsByCategory(
	category: string,
): Promise<InterviewQuestionMeta[]> {
	const questions = await getAllQuestions();
	return questions
		.filter((q) => q.data.category === category)
		.map((q) => ({
			slug: getQuestionSlug(q),
			title: q.data.title,
			difficulty: q.data.difficulty,
			order: q.data.order ?? 0,
			category: q.data.category,
		}));
}

/** 同分类内的上一题 / 下一题 */
export async function getAdjacentQuestions(category: string, slug: string) {
	const questions = await getQuestionsByCategory(category);
	const index = questions.findIndex((q) => q.slug === slug);
	return {
		prev: index > 0 ? questions[index - 1] : null,
		next:
			index >= 0 && index < questions.length - 1
				? questions[index + 1]
				: null,
	};
}
