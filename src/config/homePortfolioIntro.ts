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
	defaultCharacterId: "character-01",
	defaultTopBannerId: "wuthering",
	defaultBottomBannerId: "wuthering",
	defaultMobileTopBannerId: "wuthering",
	defaultMobileBottomBannerId: "wuthering",
	banners: {
		desktop: {
			top: [
				{
					id: "wuthering",
					label: "褪色者",
					src: "/assets/images/home-truncated/banner-01.webp",
				},
				{
					id: "original",
					label: "女武神",
					src: "/assets/images/home-truncated/banner-02.webp",
				},
			],
			bottom: [
				{
					id: "wuthering",
					label: "玛利亚",
					src: "/assets/images/home-truncated/banner-03.webp",
				},
				{
					id: "original",
					label: "追踪者",
					src: "/assets/images/home-truncated/banner-04.webp",
				},
			],
		},
		mobile: {
			top: [
				{
					id: "wuthering",
					label: "薪王",
					src: "/assets/images/home-truncated/banner-mobile-01.webp",
				},
			],
			bottom: [
				{
					id: "wuthering",
					label: "褪色者",
					src: "/assets/images/home-truncated/banner-mobile-02.webp",
				},
			],
		},
	},
	characters: [
		{
			id: "character-01",
			label: "女爵",
			src: "/assets/images/home-truncated/illustration-01.webp",
			thumbnail: "/assets/images/home-truncated/illustration-01.webp",
		},
		{
			id: "character-02",
			label: "修女",
			src: "/assets/images/home-truncated/illustration-02.webp",
			thumbnail: "/assets/images/home-truncated/illustration-02.webp",
		},
		{
			id: "character-03",
			label: "蜗",
			src: "/assets/images/home-truncated/illustration-03.webp",
			thumbnail: "/assets/images/home-truncated/illustration-03.webp",
		},
		{
			id: "character-04",
			label: "学者",
			src: "/assets/images/home-truncated/illustration-04.webp",
			thumbnail: "/assets/images/home-truncated/illustration-04.webp",
		},
		{
			id: "character-original",
			label: "法师",
			src: "/assets/images/home-truncated/illustration-05.webp",
			thumbnail: "/assets/images/home-truncated/illustration-05.webp",
		},
	],
} as const;

export type HomePortfolioIntroCharacter =
	(typeof homePortfolioIntroSettings.characters)[number];

export const homePortfolioIntroCharacterIds: readonly string[] =
	homePortfolioIntroSettings.characters.map((character) => character.id);
