<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	let now = new Date();
	let timer: number | undefined;

	const WEEKDAYS = [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
	];

	$: timeText = now.toLocaleTimeString("zh-CN", { hour12: false });
	$: dateText = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
	$: weekdayText = WEEKDAYS[now.getDay()];

	onMount(() => {
		timer = window.setInterval(() => {
			now = new Date();
		}, 1000);
	});

	onDestroy(() => {
		if (timer) window.clearInterval(timer);
	});
</script>

<div class="about-clock">
	<div class="about-clock__time">{timeText}</div>
	<div class="about-clock__date">{dateText}</div>
	<div class="about-clock__week">{weekdayText}</div>

	<!-- 动态装饰图形：同心圆环 + 脉冲核心 -->
	<div class="about-clock__orb" aria-hidden="true">
		<span class="orb-ring orb-ring--1"></span>
		<span class="orb-ring orb-ring--2"></span>
		<span class="orb-ring orb-ring--3"></span>
		<span class="orb-core"></span>
	</div>
</div>

<style>
	.about-clock {
		display: grid;
		justify-items: center;
		gap: 0.3rem;
	}

	.about-clock__time {
		font-size: 1.9rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.02em;
		color: var(--text-color);
	}

	.about-clock__date {
		font-size: 0.85rem;
		color: var(--content-meta);
	}

	.about-clock__week {
		font-size: 0.78rem;
		color: var(--primary);
		font-weight: 600;
	}

	.about-clock__orb {
		position: relative;
		width: 7.5rem;
		height: 7.5rem;
		margin-top: 1rem;
	}

	.orb-ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1px solid color-mix(in oklab, var(--primary) 40%, transparent);
	}

	.orb-ring--1 {
		animation: orb-spin 18s linear infinite;
		border-style: dashed;
	}

	.orb-ring--2 {
		inset: 0.9rem;
		animation: orb-spin 12s linear infinite reverse;
		border-color: color-mix(in oklab, var(--primary) 55%, transparent);
	}

	.orb-ring--3 {
		inset: 1.9rem;
		animation: orb-spin 8s linear infinite;
		border-color: color-mix(in oklab, var(--primary) 70%, transparent);
	}

	.orb-core {
		position: absolute;
		inset: 3rem;
		border-radius: 50%;
		background: var(--primary);
		opacity: 0.9;
		animation: orb-pulse 2.4s ease-in-out infinite;
	}

	@keyframes orb-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes orb-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.85;
		}
		50% {
			transform: scale(1.35);
			opacity: 0.45;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orb-ring,
		.orb-core {
			animation: none;
		}
	}
</style>
