export type Tool = {
	name: string;
	description: string;
	icon: string;
	image?: string;
	platforms: string[];
	url: string;
	isFree: boolean;
	accent: string;
	isMine?: boolean;
	isRecommended?: boolean;
};

export const myTools: Tool[] = [];

export const thirdPartyTools: Tool[] = [];

export function getPlatformIcon(platform: string): string {
	const lower = platform.toLowerCase();
	if (lower.includes("windows")) return "fa7-brands:windows";
	if (lower.includes("mac") || lower.includes("ios")) return "fa7-brands:apple";
	if (lower.includes("linux")) return "fa7-brands:linux";
	if (lower.includes("android")) return "fa7-brands:android";
	if (lower.includes("web")) return "material-symbols:public";
	if (lower.includes("photoshop")) return "simple-icons:adobephotoshop";
	if (lower.includes("shopee")) return "material-symbols:local-mall-rounded";
	return "material-symbols:devices-rounded";
}
