import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 禁用音乐播放器方法：
	// 模板默认侧边栏和导航栏两个都显示
	// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
	// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: false,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "10046455237",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 资源目录结构：audio=音频, cover=背景图, lyrics=歌词, vinyl-record=黑胶唱片图
	local: {
		playlist: [
			{
				name: "Nightreign",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/nightreign-01.mp3",
				cover: "/assets/music/cover/nightreign-01.mp4",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/nightreign-01.lrc",
			},
			{
				name: "The Outset",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/the-outset-02.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/the-outset-02.lrc",
			},
			{
				name: "The Shrouded Roundtable Hold",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/the-shrouded-roundtable-hold-03.mp3",
				cover: "/assets/music/cover/the-shrouded-roundtable-hold-03.mp4",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/the-shrouded-roundtable-hold-03.lrc",
			},
			{
				name: "The Nightfarers",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/the-nightfarers-04.mp3",
				cover: "/assets/music/cover/the-nightfarers-04.mp4",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/the-nightfarers-04.lrc",
			},
			{
				name: "Limveld",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/limveld-05.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/limveld-05.lrc",
			},
			{
				name: "Limveld (Eventide)",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/limveld-eventide-06.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/limveld-eventide-06.lrc",
			},
			{
				name: "Limveld (Night)",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/limveld-night-07.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/limveld-night-07.lrc",
			},
			{
				name: "Spirit Shelter",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/spirit-shelter-08.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/spirit-shelter-08.lrc",
			},
			{
				name: "Gladius, Beast of Night",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/gladius-beast-of-night-09.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/gladius-beast-of-night-09.lrc",
			},
			{
				name: "Return",
				artist: "Elden Ring Nightreign",
				url: "/assets/music/audio/return-10.mp3",
				cover: "/assets/music/cover/the-outset-02.jpg",
				vinyl: "/assets/music/vinyl-record/nightreign-01.jpg",
				lrc: "/assets/music/lyrics/return-10.lrc",
			},
		],
	},
};
