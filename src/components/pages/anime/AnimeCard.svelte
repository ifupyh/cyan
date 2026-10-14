<script lang="ts">
	import type { StandardizedAnime } from "@/types/anime";

	interface Props {
		anime: StandardizedAnime;
		onclick?: (anime: StandardizedAnime) => void;
	}

	let { anime, onclick }: Props = $props();

	function handleClick() {
		onclick?.(anime);
	}
</script>

<button
	type="button"
	class="anime-tilt-card group"
	aria-label={anime.title}
	onclick={handleClick}
>
	<div class="anime-tilt-card__media">
		{#if anime.poster}
			<img
				src={anime.poster}
				alt={anime.title}
				loading="lazy"
				decoding="async"
				referrerpolicy="no-referrer"
				crossorigin="anonymous"
			/>
		{:else}
			<span class="anime-tilt-card__placeholder">🎬</span>
		{/if}
	</div>
	<span class="anime-tilt-card__title">{anime.title}</span>
</button>

<style>
	.anime-tilt-card {
		--tilt: -1.2deg;
		position: relative;
		display: block;
		padding: 9px 9px 26px;
		transform: rotate(var(--tilt));
		border: 1px solid var(--line-divider);
		border-radius: 2px;
		background: var(--card-bg);
		box-shadow: 0 10px 22px rgb(0 0 0 / 0.08);
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition:
			transform 0.24s ease,
			box-shadow 0.24s ease;
	}

	.anime-tilt-card:nth-child(2n) {
		--tilt: 1.3deg;
	}

	.anime-tilt-card:nth-child(3n) {
		--tilt: -0.6deg;
	}

	.anime-tilt-card:hover {
		transform: rotate(0deg) translateY(-4px);
		box-shadow: 0 14px 28px rgb(0 0 0 / 0.12);
	}

	.anime-tilt-card__media {
		overflow: hidden;
		border: 1px solid var(--line-divider);
		background: color-mix(in oklab, var(--btn-regular-bg) 60%, transparent);
	}

	.anime-tilt-card__media img {
		display: block;
		width: 100%;
		aspect-ratio: 2 / 3;
		object-fit: cover;
	}

	.anime-tilt-card__placeholder {
		display: grid;
		aspect-ratio: 2 / 3;
		place-items: center;
		font-size: 2rem;
		color: var(--content-meta);
	}

	.anime-tilt-card__title {
		position: absolute;
		right: 8px;
		bottom: 8px;
		left: 8px;
		overflow: hidden;
		color: var(--content-meta);
		font-size: 0.8rem;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
