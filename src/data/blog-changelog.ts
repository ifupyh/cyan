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
		date: "2026-11-18",
		version: "V0.1.9",
		displayDate: "2026 年 11 月 18 日",
		kind: "内容更新",
		title: "第九篇博文发布",
		summary:
			"发布《DeepSeek Harness 好用的插件：装完这 10 个，它才真正开始替你干活》，整理一个月里实际留下的插件组合、安装方式与踩过的坑。",
		details: [
			"发布第九篇博文，覆盖插件市场、上下文压缩、费用计量、安全网、记忆、Office、桌面控制与 IM 机器人。",
			"附三套按场景搭配的插件组合，以及安装顺序与权限边界上的注意事项。",
		],
		tags: ["文章", "DeepSeek", "AI"],
		tone: "gold",
	},
	{
		date: "2026-11-12",
		version: "V0.1.8",
		displayDate: "2026 年 11 月 12 日",
		kind: "内容更新",
		title: "第八篇博文发布",
		summary:
			"发布《Codex 安装、配置与使用》，把桌面应用、CLI 与 IDE 插件三种入口的安装、登录和第一次运行串成一条线，并新增「工具」分类。",
		details: [
			"发布第八篇博文，覆盖 Codex 三种使用形态与各自的适用场景。",
			"整理 Node 环境、npm 安装、PowerShell 脚本策略拦截等常见问题。",
			"新增「工具」分类，Claude Code 安装与配置一文同步归入该分类。",
		],
		tags: ["文章", "Codex", "AI"],
		tone: "mint",
	},
	{
		date: "2026-11-10",
		version: "V0.1.7",
		displayDate: "2026 年 11 月 10 日",
		kind: "内容更新",
		title: "第七篇博文发布",
		summary:
			"发布《Claude Code 安装与配置：没有官方账号也能用》，从 npm 与原生安装、PATH 排错，到 API + CC Switch 接入国产模型，一条链路走通。",
		details: [
			"发布第七篇博文，整理 Claude Code 的两种安装方式与常见安装故障。",
			"补充 DeepSeek、智谱 GLM、Kimi 等平台的 Key 获取路径，以及 CC Switch 的一键切换与健康检查用法。",
		],
		tags: ["文章", "Claude Code", "AI"],
		tone: "violet",
	},
	{
		date: "2026-10-27",
		version: "V0.1.6",
		displayDate: "2026 年 10 月 27 日",
		kind: "内容更新",
		title: "第六篇博文发布",
		summary:
			"发布《OpenCV 图像处理实战：画框、二值化、滤波与视频流》，串起几何绘制、阈值分割、归一化、噪声滤波与视频读写的关键函数与取舍。",
		details: [
			"发布第六篇博文，整理 OpenCV 图像处理进阶与视频读写的常用操作。",
			"补充五种阈值模式对照、三种滤波的选型依据，以及视频链路的静默失败陷阱。",
		],
		tags: ["文章", "OpenCV"],
		tone: "blue",
	},
	{
		date: "2026-10-20",
		version: "V0.1.5",
		displayDate: "2026 年 10 月 20 日",
		kind: "内容更新",
		title: "第五篇博文发布",
		summary: "发布《智能多媒体广告机 — 架构梳理》，复盘广告机项目的系统架构与设备端四进程设计。",
		details: [
			"发布第五篇博文，梳理广告机项目的整体系统架构与设备端四进程关系。",
			"补充 QT 播放进程的启动、播放列表下载与命令处理三个关键流程。",
		],
		tags: ["文章", "嵌入式"],
		tone: "violet",
	},
	{
		date: "2026-10-18",
		version: "V0.1.4",
		displayDate: "2026 年 10 月 18 日",
		kind: "内容更新",
		title: "第四篇博文发布",
		summary: "发布《从 C 到 Qt：拆解华为 Linux 编码规范的三层演进》，以嵌入式视角解读华为 C/C++/Qt 三份编码规范。",
		details: [
			"发布第四篇博文，从嵌入式工程师视角拆解华为三份 Linux 编码规范的演进主线。",
			"补充面试速记清单，并对照「体积 / 实时性 / 确定性」三条嵌入式约束。",
		],
		tags: ["文章", "嵌入式"],
		tone: "mint",
	},
	{
		date: "2026-09-27",
		version: "V0.1.3",
		displayDate: "2026 年 9 月 27 日",
		kind: "内容更新",
		title: "第三篇博文发布",
		summary: "发布《Qt 车载多媒体系统实战：从零搭建一套车载娱乐系统》，讲清车载端/后端/流媒体三进程架构的设计取舍。",
		details: [
			"发布第三篇博文，拆解车载多媒体系统的三进程架构与技术选型。",
			"落地天气、音乐、视频三个模块，串起 HTTP、SQLite、媒体播放与事件处理。",
		],
		tags: ["文章", "Qt"],
		tone: "violet",
	},
	{
		date: "2026-09-10",
		version: "V0.1.2",
		displayDate: "2026 年 9 月 10 日",
		kind: "内容更新",
		title: "第二篇博文发布",
		summary: "发布《用 C++ 和 Boost.Asio 手写一个 HTTP 服务器》，从监听、解析、路由到响应串起一条完整链路。",
		details: [
			"发布第二篇博文，用 Boost.Asio 手写 HTTP 服务器，串起 HTTP 协议、单例、工厂与异步生命周期。",
			"补充项目结构图，梳理 WebServer、HttpSession、Handler 家族等核心类。",
		],
		tags: ["文章", "网络编程"],
		tone: "blue",
	},
	{
		date: "2026-09-03",
		version: "V0.1.1",
		displayDate: "2026 年 9 月 3 日",
		kind: "内容更新",
		title: "首篇博文发布",
		summary: "发布建站复盘《从 Aemeath 到 Cyan：我的博客诞生记》。",
		details: [
			"发布首篇博文，回顾技术选型、二次开发改动与三个踩坑经历。",
			"补充首页、目录结构、文章页三张截图与 ASCII 架构示意图。",
		],
		tags: ["文章", "建站"],
		tone: "blue",
	},
	{
		date: "2026-09-01",
		version: "V0.1.0",
		displayDate: "2026 年 9 月 1 日",
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
