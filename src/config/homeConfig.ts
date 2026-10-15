import type { HomeConfig } from "../types/config";

export const homeConfig: HomeConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/rain-avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/rain-avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/Cyan.webp",

	// 名字
	name: "Cyan",

	// 首页展示名字（留空则使用 name）
	displayName: "Cyan",

	// 职业/身份标签
	occupation: "[嵌入式程师 / 技术博主]",

	// 个人签名（支持多条，会循环打字+删除效果）
	bio: ["且视他人之疑目如盏盏鬼火，大胆地去走你的夜路"],

	hero: {
		backgroundImage: "/assets/images/wallpaper/home-page/home-page-01.webp",
		mosaic: {
			rows: 4,
			columns: 6,
			idleVisible: 6,
			idleInterval: 900,
			seed: 20260814,
			// 首屏六块碎片按 reveal rank 放置；滚动或轮换后的随机布局不受影响。
			initialLayout: [
				{ x: 0.14, y: 0.305, width: 0.104, height: 0.205 },
				{ x: 0.435, y: 0.18, width: 0.068, height: 0.13, blur: 5.5 },
				{ x: 0.642, y: 0.368, width: 0.047, height: 0.092, blur: 5 },
				{ x: 0.863, y: 0.402, width: 0.097, height: 0.19 },
				{ x: 0.337, y: 0.653, width: 0.159, height: 0.313 },
				{ x: 0.639, y: 0.751, width: 0.116, height: 0.228 },
			],
			scrub: 0.45,
			// 滑动距离整体砍半，同样的滚动量推进更快
			desktopScrollDistance: 3250,
			mobileScrollDistance: 2300,
			desktopDialogueTailDistance: 240,
			mobileDialogueTailDistance: 180,
			desktopMinViewports: 4.05,
			mobileMinViewports: 3.05,
			interactionHold: 0.06,
		},
		contact: {
			platform: "",
			handle: "nayC漾陈",
		},
		sticker: {
			image: "/assets/images/wallpaper/home-page/ranni-sticker.webp",
			alt: "小小拉妮",
			eye: {
				xPercent: 41.1,
				yPercent: 48.2,
				travelXPercent: 1.4,
				travelYPercent: 1,
			},
			rightEye: {
				xPercent: 64.1,
				yPercent: 44.7,
			},
			mouth: {
				xPercent: 53.4,
				yPercent: 50.7,
				widthPercent: 7.2,
				heightPercent: 1.9,
				rotation: -6,
				travelScale: 0.45,
			},
		},
		// galgame 对话框（写死暗黑主题）。内容全部由此驱动，可自由增删
		dialogue: 
		{
			enabled: true,
			speakers: {
				host: "菈妮",
				visitor: "褪色者",
			},
			menuTitle: "想聊点什么？",
			typingSpeed: 45,
			autoDelay: 1600,
			// 默认逐句播放的简介，末句后弹出话题菜单
			intro: [
				{ speaker: "host", text: "……又一位褪色者，踏进了这片遗迹。" },
				{ speaker: "host", text: "我是菈妮，此地的引路人。那位薪王正埋头捣鼓他的嵌入式板子，无暇亲自迎客。" },
				{
					speaker: "host",
					text: "他托我转告一句：且视他人之疑目如盏盏鬼火，大胆地去走你的夜路。",
				},
				{ speaker: "host", text: "想打听什么？触碰下方的话题，篝火会引你前行。" },
			],
			// 话题菜单：点击进入逐句对话，末句后返回菜单
			topics: [
				{
					title: "关于我",
					lines: [
						{ speaker: "visitor", text: "那位薪王，是什么来路？" },
						{
							speaker: "host",
							text: "一名嵌入式工程师，成日与寄存器、中断和示波器为伍。",
						},
						{
							speaker: "host",
							text: "在硬件底层与代码之间穿梭，俗称「在裸机上点灯的人」。",
						},
						{ speaker: "visitor", text: "听起来，不太轻松。" },
						{
							speaker: "host",
							text: "确不轻松。但唤醒一颗芯片、看它按你的意志运转，那种快意，不亚于在病村点亮一簇篝火。若感兴趣，不妨在篝火旁坐下聊聊。",
						},
					],
				},
				{
					title: "博客特色",
					lines: [
						{ speaker: "visitor", text: "这片遗迹里，有什么可看的？" },
						{
							speaker: "host",
							text: "有音乐的可视化演奏、有嵌入式的踩坑手记，但此处的重点终究还是文章。",
						},
						{
							speaker: "host",
							text: "那位薪王近来在捣鼓 Agent 与自动化，不知又要在火堆里烤些什么。",
						},
						{ speaker: "host", text: "慢慢逛，角落里藏着不少彩蛋。愿你的探索有所收获。" },
					],
				},
			],
		},
		// 玻璃雨珠 + 撞击水花（移动端自动降低密度，尊重 prefers-reduced-motion）
		rain: {
			enabled: true,
			intensity: 0.6,
			// 留空则随主题自动取色（暗色→白 / 浅色→深灰）；也可填 "#7fb0ff" 或 "127,176,255"
			color: "#ffffff",
		},
	},

	dataLayer: {
		visitImage: "/assets/images/wallpaper/home-page/home-page-03.webp",
		archiveImage: "/assets/images/wallpaper/home-page/home-page-04.webp",
		contactImage: "/assets/images/wallpaper/home-page/home-page-05.webp",
	},

	// 桌面端双层影像交互：固定背景揭示 → 五幕画面横向叙事
	homeBlinds: {
		enabled: true,
		reveal: {
			backgroundImage: "/assets/images/wallpaper/home-page/home-page-06.webp",
			foregroundImage: "/assets/images/wallpaper/home-page/home-page-07.png",
			foregroundAlt: "奔跑人物剪影",
			foregroundOpacity: 0.5,
			pointerTravel: 28,
			// 长条横移揭示的入场标题：标题单行显示（版式按 4 字排），
			// 祝福语单行显示（版式按 5 字排），可自由增减条数
			headline: {
				title: "愿火焰指引你",
				messages: ["余烬中仍有微光", "长夜尽头是黎明", "愿前路无恶意", "勿坠入深渊"],
				enterDuration: 0.6,
				messageHold: 2.6,
				messageFlipDuration: 0.75,
			},
		},
		scenes: {
			scrollDistance: 3400,
			// 背景跑马灯：列表从右往左无缝循环，只有一张也会自动复制到铺满
			cycleImages: ["/assets/images/wallpaper/home-page/home-page-08.webp"],
			cycleDuration: 26,
			composite: {
				eyebrow: "PROLOGUE / KINDLING",
				title: "点燃篝火",
				description: "以代码为薪、热爱为焰，于荒芜之地升起第一簇篝火。",
				alt: "第一幕插画",
				// 明信片右下角的落款日期，按每张图的实际日期改；删掉即不显示
				date: "2026 / 05 / 07",
			},
			items: [
				{
					eyebrow: "SCENE 02 / REST",
					title: "篝火长明",
					description: "一簇篝火落定，旅人自此有火可依，无惧漫漫长夜。",
					image: "/assets/images/wallpaper/home-page/home-page-09.webp",
					alt: "第二幕插画",
					date: "2026 / 06 / 10",
				},
				{
					eyebrow: "SCENE 03 / ASH",
					title: "余烬微冷",
					description: "人往学海拾薪，余烬暂冷，篝火静候旅人归。",
					image: "/assets/images/wallpaper/home-page/home-page-10.webp",
					alt: "第三幕插画",
					date: "2026 / 06 / 21",
				},
				{
					eyebrow: "SCENE 04 / EMBER",
					title: "复燃余烬",
					description: "拨亮余烬，添薪续焰，一砖一瓦再把营地修葺。",
					image: "/assets/images/wallpaper/home-page/home-page-11.webp",
					alt: "第四幕插画",
					date: "2026 / 08 / 18",
				},
				{
					eyebrow: "FINALE / FIRE",
					title: "火焰不熄",
					description: "笔墨暂歇，来日方长；愿这簇火，长久照亮来路。",
					image: "/assets/images/wallpaper/home-page/home-page-12.webp",
					alt: "第五幕插画",
					date: "2026 / 09 / 01",
				},
			],
			standImages: ["/assets/images/wallpaper/home-page/home-page-13.png"],
		},
	},

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			url: "copy:17369174973",
			showName: false,
		},
		{
			name: "B站",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/412734622",
			showName: false,
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/ifupyh",
			showName: false,
		},
		{
			name: "站内留言",
			icon: "material-symbols:chat-rounded",
			url: "/guestbook/",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
