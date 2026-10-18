export type InterviewDifficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_LABELS: Record<InterviewDifficulty, string> = {
	easy: "简单",
	medium: "中等",
	hard: "困难",
};

export interface InterviewCategoryConfig {
	slug: string;
	name: string;
	icon: string;
	description?: string;
}

export interface InterviewConfig {
	categories: InterviewCategoryConfig[];
}

export interface InterviewCategorySummary extends InterviewCategoryConfig {
	count: number;
}

export interface InterviewQuestionMeta {
	slug: string;
	title: string;
	difficulty: InterviewDifficulty;
	order: number;
	category: string;
}
