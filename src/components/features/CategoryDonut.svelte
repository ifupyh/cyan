<script lang="ts">
	export type DonutItem = { name: string; count: number };

	export let categories: DonutItem[] = [];

	// 每个分类一个颜色，循环使用调色板
	const palette = [
		"#f472b6",
		"#818cf8",
		"#34d399",
		"#fbbf24",
		"#60a5fa",
		"#f87171",
		"#a78bfa",
		"#2dd4bf",
		"#fb923c",
		"#38bdf8",
	];

	const total = Math.max(
		1,
		categories.reduce((s, c) => s + c.count, 0),
	);

	// 环形图参数
	const R = 58;
	const C = 2 * Math.PI * R;

	let offset = 0;
	const segments = categories.map((c, i) => {
		const len = (c.count / total) * C;
		const seg = { ...c, color: palette[i % palette.length], len, offset };
		offset += len;
		return seg;
	});

	let hovered = -1;
</script>

<div class="donut">
	<div class="donut__wrap">
		<svg
			viewBox="0 0 140 140"
			role="img"
			aria-label="文章分类统计"
			class="donut__svg"
		>
			<circle class="donut__track" cx="70" cy="70" r={R} />
			{#each segments as seg, i}
				<circle
					class="donut__seg"
					cx="70"
					cy="70"
					r={R}
					fill="none"
					stroke={seg.color}
					stroke-width="16"
					stroke-linecap="butt"
					stroke-dasharray={`${seg.len} ${C - seg.len}`}
					stroke-dashoffset={-seg.offset}
					transform="rotate(-90 70 70)"
					opacity={hovered === -1 || hovered === i ? 1 : 0.35}
					on:mouseenter={() => (hovered = i)}
					on:mouseleave={() => (hovered = -1)}
				/>
			{/each}
		</svg>

		<div class="donut__center">
			{#if hovered >= 0 && segments[hovered]}
				<span class="donut__center-name">{segments[hovered].name}</span>
				<span class="donut__center-count">{segments[hovered].count} 篇</span>
			{:else}
				<span class="donut__center-count">{total} 篇</span>
				<span class="donut__center-name">文章</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.donut {
		display: grid;
		place-items: center;
	}

	.donut__wrap {
		position: relative;
		width: 100%;
		max-width: 17rem;
		aspect-ratio: 1;
	}

	.donut__svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.donut__track {
		fill: none;
		stroke: color-mix(in oklab, var(--content-meta) 14%, transparent);
		stroke-width: 16;
	}

	.donut__seg {
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.donut__center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		pointer-events: none;
	}

	.donut__center-count {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text-color);
		font-variant-numeric: tabular-nums;
	}

	.donut__center-name {
		font-size: 0.78rem;
		color: var(--content-meta);
	}
</style>
