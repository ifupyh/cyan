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

export const myTools: Tool[] = [
	{
		name: "自动上架-V4.1.0",
		description: "跨境商品批量上架，串联表格、图库与 AI 标题。",
		icon: "material-symbols:rocket-launch-rounded",
		image: "/assets/tools/auto-listing-v4.1.0.png",
		platforms: ["Windows", "Shopee", "TikTok Shop"],
		url: "https://wwbna.lanzn.com/b01d78blmf",
		isFree: false,
		accent: "#e0a322",
		isMine: true,
		isRecommended: true,
	},
	{
		name: "批量图案替换工具",
		description: "按模板批量替换商品图案，支持图库与子文件夹两种制作模式。",
		icon: "material-symbols:grid-view-rounded",
		platforms: ["Windows"],
		url: "https://wwbna.lanzouv.com/b01d72k9mb",
		isFree: false,
		accent: "#0ea5e9",
		isMine: true,
	},
	{
		name: "图片批量提取工具",
		description: "从 PSD 批量提取商品图，并整理为自动上架所需的素材。",
		icon: "material-symbols:image-search-rounded",
		platforms: ["Windows", "Photoshop"],
		url: "https://wwbna.lanzouv.com/b01d72ka5a",
		isFree: false,
		accent: "#22c55e",
		isMine: true,
	},
	{
		name: "批量修改 Shopee 库存",
		description: "按 SKU 批量修改 Shopee 商品库存，适合日常库存维护。",
		icon: "material-symbols:inventory-2-rounded",
		platforms: ["Windows", "Shopee"],
		url: "https://wwbna.lanzouv.com/b01d72kaje",
		isFree: false,
		accent: "#f97316",
		isMine: true,
	},
];

export const thirdPartyTools: Tool[] = [
	{
		name: "Tabby",
		description:
			"现代开源终端模拟器，支持 SSH、Telnet、本地 Shell，界面美观，插件丰富。",
		icon: "material-symbols:terminal-rounded",
		platforms: ["Windows", "Mac", "Linux"],
		url: "https://tabby.sh",
		isFree: true,
		accent: "#38bdf8",
	},
	{
		name: "ShareX",
		description:
			"Windows 下强力截图工具，支持截图、录屏、OCR、自动上传到图床。",
		icon: "material-symbols:photo-camera-rounded",
		platforms: ["Windows"],
		url: "https://getsharex.com",
		isFree: true,
		accent: "#22c55e",
	},
	{
		name: "Raycast",
		description:
			"Mac 平台高效率启动器，扩展生态完整，适合把常用操作收进键盘流。",
		icon: "material-symbols:keyboard-command-key",
		platforms: ["Mac"],
		url: "https://raycast.com",
		isFree: true,
		accent: "#ef4444",
	},
	{
		name: "Obsidian",
		description:
			"基于本地 Markdown 的知识管理工具，双向链接、图谱展示和插件生态都很顺手。",
		icon: "material-symbols:book-2-rounded",
		platforms: ["Windows", "Mac", "Linux"],
		url: "https://obsidian.md",
		isFree: true,
		accent: "#8b5cf6",
	},
	{
		name: "VS Code",
		description:
			"微软出品的开源代码编辑器，插件生态丰富，前端、后端、脚本都能覆盖。",
		icon: "material-symbols:code-blocks-rounded",
		platforms: ["Windows", "Mac", "Linux"],
		url: "https://code.visualstudio.com",
		isFree: true,
		accent: "#3b82f6",
	},
	{
		name: "Neovim",
		description:
			"Vim 的现代重构版本，终端里高度可定制的编辑器，越调越像自己的工作台。",
		icon: "material-symbols:terminal-rounded",
		platforms: ["Windows", "Mac", "Linux"],
		url: "https://neovim.io",
		isFree: true,
		accent: "#10b981",
	},
	{
		name: "Docker Desktop",
		description: "容器化开发环境，快速部署各类服务，适合本地模拟生产依赖。",
		icon: "simple-icons:docker",
		platforms: ["Windows", "Mac", "Linux"],
		url: "https://www.docker.com",
		isFree: true,
		accent: "#0ea5e9",
	},
	{
		name: "Figma",
		description:
			"在线协作设计工具，原型、UI、交付和团队评审都能放在一个画布里完成。",
		icon: "simple-icons:figma",
		platforms: ["Web", "Mac", "Windows"],
		url: "https://www.figma.com",
		isFree: true,
		accent: "#f97316",
	},
	{
		name: "1Password",
		description: "安全的密码管理器，跨平台同步，支持多因素认证和团队密钥管理。",
		icon: "material-symbols:shield-lock-rounded",
		platforms: ["Windows", "Mac", "Linux", "iOS", "Android"],
		url: "https://1password.com",
		isFree: false,
		accent: "#2563eb",
	},
	{
		name: "Notion",
		description:
			"All-in-One 工作空间，笔记、数据库、项目管理和资料沉淀都能塞进去。",
		icon: "simple-icons:notion",
		platforms: ["Windows", "Mac", "Web", "iOS", "Android"],
		url: "https://www.notion.so",
		isFree: true,
		accent: "#64748b",
	},
	{
		name: "Warp",
		description:
			"基于 Rust 的现代终端，命令块、协作和 AI 辅助让命令行更像工作流工具。",
		icon: "material-symbols:auto-awesome-rounded",
		platforms: ["Mac", "Linux"],
		url: "https://www.warp.dev",
		isFree: true,
		accent: "#a855f7",
	},
	{
		name: "Arc Browser",
		description:
			"重新组织浏览器体验，垂直标签、空间管理和分屏让浏览器更像工作系统。",
		icon: "material-symbols:public",
		platforms: ["Mac", "Windows", "iOS"],
		url: "https://arc.net",
		isFree: true,
		accent: "#ec4899",
	},
];

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
