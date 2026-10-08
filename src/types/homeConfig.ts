export type HomeBlindsSceneItem = {
	/** 左侧竖排题名的英文标识 */
	eyebrow: string;
	title: string;
	/** 明信片底部的介绍文案 */
	description: string;
	image: string;
	alt: string;
	/** 明信片右下角的落款日期，如 "2026 / 03 / 14"；留空则不渲染 */
	date?: string;
};

export type HomeBlindsHeadlineConfig = {
	title: string;
	messages: string[];
	enterDuration?: number;
	messageHold?: number;
	messageFlipDuration?: number;
};

export type HomeBlindsConfig = {
	enabled: boolean;
	reveal: {
		backgroundImage: string;
		foregroundImage: string;
		foregroundAlt: string;
		foregroundOpacity: number;
		pointerTravel: number;
		headline: HomeBlindsHeadlineConfig;
	};
	scenes: {
		scrollDistance: number;
		cycleImages: string[];
		cycleDuration: number;
		composite: Omit<HomeBlindsSceneItem, "image" | "alt"> & { alt: string };
		items: HomeBlindsSceneItem[];
		standImages: string[];
	};
};

export type HeroDialogueLine = {
	speaker?: "host" | "visitor";
	text: string;
};

export type HeroDialogueTopic = {
	title: string;
	lines: HeroDialogueLine[];
};

export type HeroDialogueConfig = {
	enabled?: boolean;
	speakers?: {
		host?: string;
		visitor?: string;
	};
	intro: HeroDialogueLine[];
	topics: HeroDialogueTopic[];
	menuTitle?: string;
	typingSpeed?: number;
	autoDelay?: number;
};

export type HeroMosaicInitialTile = {
	x: number;
	y: number;
	width: number;
	height: number;
	rotation?: number;
	blur?: number;
};

export type HeroMosaicConfig = {
	rows: number;
	columns: number;
	idleVisible: number;
	idleInterval: number;
	seed: number;
	scrub: number;
	desktopScrollDistance: number;
	mobileScrollDistance: number;
	desktopDialogueTailDistance: number;
	mobileDialogueTailDistance: number;
	desktopMinViewports: number;
	mobileMinViewports: number;
	initialLayout?: HeroMosaicInitialTile[];
	interactionHold: number;
};

export type HeroContactConfig = {
	platform: string;
	handle: string;
	href?: string;
};

export type HeroStickerConfig = {
	image: string;
	alt: string;
	eye: {
		xPercent: number;
		yPercent: number;
		travelXPercent: number;
		travelYPercent: number;
	};
	rightEye: {
		xPercent: number;
		yPercent: number;
	};
	mouth: {
		xPercent: number;
		yPercent: number;
		widthPercent: number;
		heightPercent: number;
		rotation: number;
		travelScale: number;
	};
};

export type HomeConfig = {
	avatar?: string;
	name: string;
	displayName?: string;
	occupation?: string;
	bio?: string | string[];
	hero: {
		backgroundImage: string;
		mosaic: HeroMosaicConfig;
		contact?: HeroContactConfig;
		sticker: HeroStickerConfig;
		dialogue?: HeroDialogueConfig;
		rain?: {
			enabled?: boolean;
			intensity?: number;
			color?: string;
		};
	};
	dataLayer: {
		visitImage: string;
		archiveImage: string;
		contactImage: string;
	};
	homeBlinds: HomeBlindsConfig;
	links: {
		name: string;
		url: string;
		icon: string;
		showName?: boolean;
	}[];
};
