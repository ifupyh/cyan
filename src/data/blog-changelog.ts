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
		date: "2026-10-18",
		version: "V0.1.2",
		displayDate: "2026 年 10 月 18 日",
		kind: "内容更新",
		title: "第二篇博文发布",
		summary: "发布《从 C 到 Qt：拆解华为 Linux 编码规范的三层演进》，以嵌入式视角解读华为 C/C++/Qt 三份编码规范。",
		details: [
			"发布第二篇博文，从嵌入式工程师视角拆解华为三份 Linux 编码规范的演进主线。",
			"补充面试速记清单，并对照「体积 / 实时性 / 确定性」三条嵌入式约束。",
		],
		tags: ["文章", "嵌入式"],
		tone: "mint",
	},
	{
		date: "2026-10-17",
		version: "V0.1.1",
		displayDate: "2026 年 10 月 17 日",
		kind: "内容更新",
		title: "首篇博文发布",
		summary: "发布建站复盘《从 Fuwari 到 Cyan：我的博客魔改记》，记录基于开源主题二次开发的完整过程。",
		details: [
			"发布首篇博文，回顾技术选型、二次开发改动与三个踩坑经历。",
			"补充首页、目录结构、文章页三张截图与 ASCII 架构示意图。",
		],
		tags: ["文章", "建站"],
		tone: "blue",
	},
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
