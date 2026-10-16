export type ParticleOption = {
	id: string; // 特效图案唯一标识
	label: string; // 特效图案显示名称
	src: string; // 特效图案图片路径
};

export type SakuraConfig = {
	enable: boolean; // 是否启用特效
	switchable?: boolean; // 是否允许用户在设置中切换特效
	particles: ParticleOption[]; // 可选特效图案列表
	defaultParticleId: string; // 默认特效图案
	sakuraNum: number; // 粒子数量，默认21
	limitTimes: number; // 粒子越界限制次数，-1为无限循环
	size: {
		min: number; // 粒子最小尺寸倍数
		max: number; // 粒子最大尺寸倍数
	};
	opacity: {
		min: number; // 粒子最小不透明度
		max: number; // 粒子最大不透明度
	};
	speed: {
		horizontal: {
			min: number; // 水平移动速度最小值
			max: number; // 水平移动速度最大值
		};
		vertical: {
			min: number; // 垂直移动速度最小值
			max: number; // 垂直移动速度最大值
		};
		rotation: number; // 旋转速度
		fadeSpeed: number; // 消失速度，不应大于最小不透明度
	};
	zIndex: number; // 层级，确保特效在合适的层级显示
};
