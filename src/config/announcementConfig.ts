import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "赐福指引",

	// 公告内容
	content:
		"褪色者，欢迎来到我的篝火。我是Cyan，一名嵌入式工程师，也是此地的守望者。愿你在代码与硬件之间，找到属于自己的赐福。",

	// 是否允许用户关闭公告
	closable: true,

	// 公告列表（sort 越大越靠前）
	items: [
		{
			tag: "欢迎",
			content:
				"褪色者，欢迎来到我的篝火。这里记录嵌入式的踩坑、法环黑魂的碎碎念，以及一些仍在燃烧的想法。",
			sort: 3,
		},
		{
			tag: "关于",
			content: "我是Cyan，一名与寄存器、中断和示波器为伍的嵌入式工程师。",
			sort: 2,
		},
		{
			tag: "留言",
			content: "在篝火旁留下你的印记，愿我们互为彼此的火种。",
			sort: 1,
		},
	],

	links: [
		{
			// 启用链接
			enable: true,
			// 链接文本
			text: "关于我",
			// 链接 URL
			url: "/about/",
			// 内部链接
			external: false,
		},
		{
			// 启用链接
			enable: true,
			// 链接文本
			text: "留下印记",
			// 链接 URL
			url: "/guestbook/",
			// 内部链接
			external: false,
		},
	],
};
