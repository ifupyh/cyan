import type { SakuraConfig } from "../types/effectsConfig";

// 特效配置 - 集中管理所有动画特效

export const sakuraConfig: SakuraConfig = {
	// 是否启用樱花特效
	enable: true,

	// 是否允许用户在设置中切换
	switchable: true,

	// 可选特效图案列表
	particles: [
		{ id: "particle-01", label: "粒子 1", src: "/assets/images/effects/particle-01.webp" },
		{ id: "particle-02", label: "粒子 2", src: "/assets/images/effects/particle-02.webp" },
		{ id: "particle-03", label: "粒子 3", src: "/assets/images/effects/particle-03.webp" },
		{ id: "particle-04", label: "粒子 4", src: "/assets/images/effects/particle-04.webp" },
		{ id: "particle-05", label: "粒子 5", src: "/assets/images/effects/particle-05.webp" },
		{ id: "particle-06", label: "粒子 6", src: "/assets/images/effects/particle-06.webp" },
	],
	// 默认特效图案
	defaultParticleId: "particle-01",

	// 樱花数量
	sakuraNum: 21,

	// 樱花越界限制次数，-1为无限循环
	limitTimes: -1,

	// 樱花尺寸
	size: {
		// 樱花最小尺寸倍数
		min: 0.5,
		// 樱花最大尺寸倍数
		max: 1.1,
	},

	// 樱花不透明度
	opacity: {
		// 樱花最小不透明度
		min: 0.3,
		// 樱花最大不透明度
		max: 0.9,
	},

	// 樱花移动速度
	speed: {
		// 水平移动
		horizontal: {
			// 水平移动速度最小值
			min: -1.7,
			// 水平移动速度最大值
			max: -1.2,
		},
		// 垂直移动
		vertical: {
			// 垂直移动速度最小值
			min: 1.5,
			// 垂直移动速度最大值
			max: 2.2,
		},
		// 旋转速度
		rotation: 0.03,
		// 消失速度，不应大于最小不透明度
		fadeSpeed: 0.03,
	},

	// 层级，确保樱花在合适的层级显示
	zIndex: 100,
};
