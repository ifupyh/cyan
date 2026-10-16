export type BlogChangelogTone = "blue" | "mint" | "gold" | "violet";

export type BlogChangelogEntry = {
	date: string;
	version: string;
	displayDate: string;
	kind: string;
	title: string;
	summary: string;
	details: string[];
	tags: string[];
	tone: BlogChangelogTone;
};

/**
 * 博客本身的建设记录。
 * 这里仅记录「遗忘王域」站点的页面、内容、社区和部署变化。
 */
export const blogChangelogEntries: BlogChangelogEntry[] = [
	{
		date: "2026-10-16",
		version: "V0.1.0",
		displayDate: "2026 年 10 月 16 日",
		kind: "建站起点",
		title: "遗忘王域，篝火初燃",
		summary: "在魂系美学主题下重建个人博客，确立「遗忘王域」的站点身份与内容方向。",
		details: [
			"确立站点名称「遗忘王域」与魂系主题，副标题「万物终将归于尘土，唯有故事穿越黑暗」。",
			"完成壁纸目录整理、首页中央卡片重设计、贴纸立绘替换与文案魂系化。",
			"清理原作者遗留的友链、博客文章与相册内容，从空白内容重新开始。",
		],
		tags: ["建站", "魂系", "重构"],
		tone: "gold",
	},
];
