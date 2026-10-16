import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

// ============================================================================
// 导航栏配置 - 根据顺序动态生成导航栏链接
// NavBar Configuration - Dynamically generate navigation bar links based on order
// ============================================================================
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: NavBarLink[] = [];

	// 旅记（普通链接，无下拉）
	links.push({
		name: "旅记",
		url: "/posts/",
		icon: "material-symbols:article",
	});

	// 旅人（点击直接进入友链页，二级栏可切朋友圈/留言）
	links.push({
		name: "旅人",
		url: "/friends/",
		icon: "material-symbols:groups",
	});

	// 浮光（浮光集聚合页）
	links.push({
		name: "浮光",
		url: "/glimmer/",
		icon: "material-symbols:person",
	});

	// 余音（沉浸式音乐播放器）
	links.push({
		name: "余音",
		url: "/music/",
		icon: "material-symbols:music-note",
	});

	// 起源（聚合页，二级栏可切关于我/打赏/动态表情/站点统计）
	links.push({
		name: "起源",
		url: "/about/",
		icon: "material-symbols:info",
	});

	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

// ============================================================================
// 链接预设 - 可自由自定义导航栏链接的名称、图标和URL
// Link Presets - Allows free customization of the name, icon, and URL of navigation bar links
// ============================================================================
export const LinkPresets: Record<string, NavBarLink> = {
	Home: {
		name: "主页",
		url: "/",
		icon: "material-symbols:home",
	},
	Archive: {
		name: "归档",
		url: "/archive/",
		icon: "material-symbols:archive",
	},
	Categories: {
		name: "分类",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: {
		name: "标签",
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
	},
	Tools: {
		name: "工具",
		url: "/tools/",
		icon: "material-symbols:construction-rounded",
	},
	Changelog: {
		name: "项目更新日志",
		url: "/changelog/",
		icon: "material-symbols:history-edu-rounded",
	},
	Friends: {
		name: "友链",
		url: "/friends/",
		icon: "material-symbols:group",
		pageKey: "friends",
	},
	Moments: {
		name: "朋友圈",
		url: "/moments/",
		icon: "material-symbols:rss-feed-rounded",
	},
	Sponsor: {
		name: "打赏",
		url: "/sponsor/",
		icon: "material-symbols:favorite",
		pageKey: "sponsor",
	},
	Guestbook: {
		name: "留言",
		url: "/guestbook/",
		icon: "material-symbols:chat",
		pageKey: "guestbook",
	},
	About: {
		name: "关于我",
		url: "/about/",
		icon: "material-symbols:person",
	},
	Lottie: {
		name: "动态表情",
		url: "/lottie/",
		icon: "material-symbols:auto-awesome-rounded",
	},
	Analytics: {
		name: "站点统计",
		url: "/analytics/",
		icon: "material-symbols:monitoring-rounded",
	},
	BlogChangelog: {
		name: "博客日志",
		url: "/blog-changelog/",
		icon: "material-symbols:auto-stories-rounded",
	},
	Gallery: {
		name: "相册",
		url: "/gallery/",
		icon: "material-symbols:photo-library",
		pageKey: "gallery",
	},
	Anime: {
		name: "追番",
		url: "/anime/",
		icon: "material-symbols:live-tv",
		pageKey: "anime",
	},
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
