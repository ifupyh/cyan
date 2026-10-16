import type { GalleryConfig } from "@/types/galleryConfig";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表
	albums: [
		// 支持jpg/png/webp/avif/gif格式
		// id: 相册唯一标识符（用于目录命名和URL路径），比如设置：id: "firefly-2026", 对应 public/gallery/firefly-2026/目录
		// cover: 手动指定封面图（可选，不填会把cover.*文件作为封面图，如果没有cover.*文件，则使用第一张图片作为封面图）
		// name: 相册名称
		// description: 相册描述
		// location: 相册拍摄地点
		// date: 相册日期，格式为 YYYY-MM-DD，用于排序和显示
		// tags: 相册标签，用于分类和过滤
		// password: 访问密码，设置后需要输入密码才能查看相册内容（可选）
		// passwordHint: 密码提示，设置后在输入密码错误时显示（可选，需配合password使用）
		// 每添加一个数组项就相当于添加了一个相册，记得在 public/gallery/ 目录下创建对应的子目录并放入图片
		{
			id: "wuthering-waves",
			name: "交界地掠影",
			description:
				"褪色者行走于交界地，把途中的篝火、废墟与片刻光影留在这里。",
			location: "The Lands Between",
			date: "2026-07-24",
			tags: ["艾尔登法环", "魂系", "游戏摄影"],
			cover: "/assets/images/wallpaper/original-quality/wallpaper-01.webp",
		},
		{
			id: "encrypted-test",
			name: "加密相册",
			description: "预留的加密相册，设置密码后放入需要保护的照片。",
			location: "",
			date: "2026-10-16",
			tags: ["加密相册"],
			password: "123456",
			passwordHint: "示例密码 123456",
		},
	],

	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数，默认 240
	// 值越小列数越多，值越大列数越少
	columnWidth: 240,
};
