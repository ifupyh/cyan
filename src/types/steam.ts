// Steam 游戏数据
export type SteamGame = {
	appid: number;
	name: string;
	icon: string; // 小图标（32x32，用于小尺寸展示）
	header: string; // header 图（460x215，横向）
	cover: string; // 库封面图（600x900，竖版，高清）
	link: string; // 商店链接
	playtimeForever: number; // 总游玩时长（分钟）
	playtime2weeks?: number; // 近两周时长（分钟）
};
