/**
 * 首页开屏动画的访客偏好设置。
 *
 * 这些值只保存在访客自己的浏览器里，不会改变站点构建配置；这样每个人
 * 都可以选择是否播放开屏动画，以及自己喜欢的角色。
 */
export const homePortfolioIntroSettings = {
	enabledStorageKey: "cyan.home-portfolio-intro-enabled.v1",
	characterStorageKey: "cyan.home-portfolio-intro-character.v1",
	topBannerStorageKey: "cyan.home-portfolio-intro-top-banner.v1",
	bottomBannerStorageKey: "cyan.home-portfolio-intro-bottom-banner.v1",
	defaultEnabled: true,
	defaultCharacterId: "character-03",
	defaultTopBannerId: "wuthering",
	defaultBottomBannerId: "wuthering",
	defaultMobileTopBannerId: "wuthering",
	defaultMobileBottomBannerId: "wuthering",
	banners: {
		desktop: {
			top: [
				{
					id: "wuthering",
					label: "梅琳娜",
					src: "/assets/images/home-truncated/intro-banner-top-wuthering.webp",
				},
				{
					id: "original",
					label: "菲比",
					src: "/assets/images/home-truncated/b-2.webp",
				},
			],
			bottom: [
				{
					id: "wuthering",
					label: "菈妮",
					src: "/assets/images/home-truncated/intro-banner-bottom-wuthering.webp",
				},
				{
					id: "original",
					label: "玛莉卡",
					src: "/assets/images/home-truncated/b-3.webp",
				},
			],
		},
		mobile: {
			top: [
				{
					id: "wuthering",
					label: "梅琳娜",
					src: "/assets/images/home-truncated/intro-banner-mobile-top-wuthering.webp",
				},
			],
			bottom: [
				{
					id: "wuthering",
					label: "菈妮",
					src: "/assets/images/home-truncated/intro-banner-mobile-bottom-wuthering.webp",
				},
			],
		},
	},
	characters: [
		{
			id: "character-01",
			label: "菈妮",
			src: "/assets/images/home-truncated/character-01.webp",
			thumbnail: "/assets/images/home-truncated/character-01.webp",
		},
		{
			id: "character-02",
			label: "菈妮",
			src: "/assets/images/home-truncated/character-02.webp",
			thumbnail: "/assets/images/home-truncated/character-02.webp",
		},
		{
			id: "character-03",
			label: "梅琳娜（默认）",
			src: "/assets/images/home-truncated/character-03.webp",
			thumbnail: "/assets/images/home-truncated/character-03.webp",
		},
		{
			id: "character-04",
			label: "菈妮",
			src: "/assets/images/home-truncated/character-04.webp",
			thumbnail: "/assets/images/home-truncated/character-04.webp",
		},
		{
			id: "character-original",
			label: "菲比",
			src: "/assets/images/home-truncated/b-1.webp",
			thumbnail: "/assets/images/home-truncated/b-1.webp",
		},
	],
} as const;

export type HomePortfolioIntroCharacter =
	(typeof homePortfolioIntroSettings.characters)[number];

export const homePortfolioIntroCharacterIds: readonly string[] =
	homePortfolioIntroSettings.characters.map((character) => character.id);
