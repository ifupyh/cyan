import type { GalleryConfig } from "@/types/galleryConfig";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表
	albums: [
		// 支持jpg/png/webp/avif/gif格式
		// id: 相册唯一标识符（用于目录命名和URL路径），比如设置：id: "cyan-2026", 对应 public/gallery/cyan-2026/目录
		// cover: 手动指定封面图（可选，不填会把cover.*文件作为封面图，如果没有cover.*文件，则使用第一张图片作为封面图）
		// name: 相册名称
		// description: 相册描述
		// location: 相册拍摄地点
		// date: 相册日期，格式为 YYYY-MM-DD，用于排序和显示
		// tags: 相册标签，用于分类和过滤（相同标签会归到同一个容器）
		// password: 访问密码，设置后需要输入密码才能查看相册内容（可选）
		// passwordHint: 密码提示，设置后在输入密码错误时显示（可选，需配合password使用）
		// 每添加一个数组项就相当于添加了一个相册，记得在 public/gallery/ 目录下创建对应的子目录并放入图片
		{
			id: "elden-ring",
			name: "法环",
			description: "艾尔登法环的游戏截图与记录。",
			location: "",
			date: "2026-07-24",
			tags: ["游戏"],
			titleLink: "https://store.steampowered.com/app/1245620/",
		},
		{
			id: "dark-souls",
			name: "黑魂系列",
			description: "黑暗之魂系列的游戏记录。",
			location: "",
			date: "2026-07-24",
			tags: ["游戏"],
			titleLink: "https://store.steampowered.com/app/335300/",
			titleColor: "#c9c4bc",
		},
		{
			id: "black-myth-wukong",
			name: "黑神话悟空",
			description: "黑神话：悟空的游戏截图与记录。",
			location: "",
			date: "2026-07-24",
			tags: ["游戏"],
		},
		{
			id: "bloodborne",
			name: "血源",
			description: "血源诅咒的游戏记录。",
			location: "",
			date: "2026-07-24",
			tags: ["游戏"],
			titleLink: "https://www.playstation.com/en-us/games/",
			titleColor: "#a62b2b",
		},
		{
			id: "sekiro",
			name: "只狼",
			description: "只狼：影逝二度的游戏记录。",
			location: "",
			date: "2026-07-24",
			tags: ["游戏"],
		},
		{
			id: "campus",
			name: "校园",
			description: "校园生活的片段与记录。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "hometown",
			name: "老家",
			description: "老家的风景与记忆。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "sichuan-zoo",
			name: "四川动物园",
			description: "四川动物园的游玩记录。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "qingcheng-mountain",
			name: "青城山",
			description: "青城山的游玩记录。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "art-gallery",
			name: "艺术馆",
			description: "艺术馆的参观记录。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "annihilation-offline",
			name: "湮灭之潮线下",
			description: "《湮灭之潮》线下活动的记录。",
			location: "",
			date: "2026-10-17",
			tags: ["生活"],
		},
		{
			id: "study",
			name: "学习",
			description: "学习笔记、读书与知识记录。",
			location: "",
			date: "2026-10-17",
			tags: ["学习"],
		},
		{
			id: "work",
			name: "工作",
			description: "工作相关的记录与项目截图。",
			location: "",
			date: "2026-10-17",
			tags: ["工作"],
		},
		{
			id: "encrypted",
			name: "加密",
			description: "需要密码才能查看的私密相册。",
			location: "",
			date: "2026-10-16",
			tags: ["加密"],
			password: "123456",
			passwordHint: "示例密码 123456",
		},
	],

	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数，默认 240
	// 值越小列数越多，值越大列数越少
	columnWidth: 240,
};
