<script lang="ts">
	import { onMount } from "svelte";

	interface Track {
		name: string;
		artist: string;
		pic?: string;
	}
	interface Lyric {
		time: number;
		text: string;
	}
	interface MusicManager {
		init: () => void;
		getState: () => {
			track: Track | null;
			isPlaying: boolean;
			progress: number;
			currentTimeStr: string;
			durationStr: string;
			lyrics: Lyric[];
			currentLrcIndex: number;
			playlist: Track[];
			currentIndex: number;
			playMode: number;
		};
		togglePlay: () => void;
		playNext: () => void;
		playPrev: () => void;
		seek: (percent: number) => void;
		playTrackByIndex: (index: number) => void;
		cyclePlayMode: () => void;
	}

	let track = $state<Track | null>(null);
	let isPlaying = $state(false);
	let progress = $state(0);
	let currentTimeStr = $state("0:00");
	let durationStr = $state("0:00");
	let lyrics = $state<Lyric[]>([]);
	let currentLrcIndex = $state(-1);
	let playlist = $state<Track[]>([]);
	let currentIndex = $state(0);
	let playMode = $state(0);
	let showPlaylist = $state(false);
	let dragging = $state(false);

	const mgr = (): MusicManager | null => (window as any).__cyanMusic ?? null;

	function syncState() {
		const m = mgr();
		if (!m) return;
		const s = m.getState();
		track = s.track ?? null;
		isPlaying = !!s.isPlaying;
		progress = s.progress ?? 0;
		currentTimeStr = s.currentTimeStr ?? "0:00";
		durationStr = s.durationStr ?? "0:00";
		lyrics = s.lyrics ?? [];
		currentLrcIndex = s.currentLrcIndex ?? -1;
		playlist = s.playlist ?? [];
		currentIndex = s.currentIndex ?? 0;
		playMode = s.playMode ?? 0;
	}

	onMount(() => {
		const m = mgr();
		if (!m) return;

		m.init();

		const onTrack = (e: Event) => {
			const d = (e as CustomEvent).detail;
			track = d.track;
			currentIndex = d.index;
		};
		const onPlayState = (e: Event) => {
			isPlaying = !!(e as CustomEvent).detail?.isPlaying;
		};
		const onTime = (e: Event) => {
			const d = (e as CustomEvent).detail;
			progress = d.progress;
			currentTimeStr = d.currentTimeStr;
			durationStr = d.durationStr;
		};
		const onLyrics = (e: Event) => {
			lyrics = (e as CustomEvent).detail?.lyrics ?? [];
		};
		const onLrcIndex = (e: Event) => {
			currentLrcIndex = (e as CustomEvent).detail?.index ?? -1;
		};
		const onInit = (e: Event) => {
			playlist = (e as CustomEvent).detail?.playlist ?? [];
		};
		const onMode = (e: Event) => {
			playMode = (e as CustomEvent).detail?.playMode ?? 0;
		};

		window.addEventListener("fm:track", onTrack);
		window.addEventListener("fm:play-state", onPlayState);
		window.addEventListener("fm:time", onTime);
		window.addEventListener("fm:lyrics", onLyrics);
		window.addEventListener("fm:lrc-index", onLrcIndex);
		window.addEventListener("fm:init", onInit);
		window.addEventListener("fm:mode", onMode);

		syncState();

		return () => {
			window.removeEventListener("fm:track", onTrack);
			window.removeEventListener("fm:play-state", onPlayState);
			window.removeEventListener("fm:time", onTime);
			window.removeEventListener("fm:lyrics", onLyrics);
			window.removeEventListener("fm:lrc-index", onLrcIndex);
			window.removeEventListener("fm:init", onInit);
			window.removeEventListener("fm:mode", onMode);
		};
	});

	const visibleLyrics = $derived.by(() => {
		if (lyrics.length === 0) return [] as { text: string; index: number }[];
		const center = currentLrcIndex < 0 ? 0 : currentLrcIndex;
		const start = Math.max(0, center - 3);
		const end = Math.min(lyrics.length, center + 4);
		return lyrics.slice(start, end).map((l, i) => ({ text: l.text, index: start + i }));
	});

	function toggle() {
		mgr()?.togglePlay();
	}
	function next() {
		mgr()?.playNext();
	}
	function prev() {
		mgr()?.playPrev();
	}
	function selectTrack(i: number) {
		mgr()?.playTrackByIndex(i);
		showPlaylist = false;
	}
	function cycleMode() {
		mgr()?.cyclePlayMode();
	}

	function seekFromClientX(clientX: number) {
		const bar = document.querySelector<HTMLElement>(".music-fs__progress");
		if (!bar) return;
		const rect = bar.getBoundingClientRect();
		const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
		mgr()?.seek(p);
	}
	function onProgressDown(e: PointerEvent) {
		dragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
		seekFromClientX(e.clientX);
	}
	function onProgressMove(e: PointerEvent) {
		if (dragging) seekFromClientX(e.clientX);
	}
	function onProgressUp() {
		dragging = false;
	}
</script>

<div class="music-fs">
	<!-- 背景：封面图铺满全屏，右侧清晰呈现人物 -->
	<div
		class="music-fs__bg"
		style:background-image={track?.pic ? `url("${track.pic}")` : undefined}
	></div>
	<!-- 遮罩：左侧加深保证内容可读，右侧保持清晰 -->
	<div class="music-fs__mask"></div>

	<!-- 左半屏内容 -->
	<div class="music-fs__left">
		<div class="music-fs__hero">
			<div class="music-fs__lyrics">
				{#if visibleLyrics.length === 0}
					<p class="music-fs__lyric music-fs__lyric--placeholder">···</p>
				{:else}
					{#each visibleLyrics as line (line.index)}
						<p class="music-fs__lyric" class:active={line.index === currentLrcIndex}>
							{line.text}
						</p>
					{/each}
				{/if}
			</div>

			<div class="music-fs__center">
				<div class="music-fs__vinyl-wrap">
					<div class="music-fs__vinyl" class:spinning={isPlaying}>
						<div class="music-fs__vinyl-cover">
							{#if track?.pic}
								<img src={track.pic} alt="" draggable="false" />
							{/if}
						</div>
					</div>
				</div>

				<h1 class="music-fs__title">{track?.name ?? "—"}</h1>
				<p class="music-fs__artist">{track?.artist ?? ""}</p>
			</div>
		</div>

		<!-- 底部控制条 -->
		<div class="music-fs__controls">
			<div
				class="music-fs__progress"
				role="slider"
				tabindex="0"
				aria-label="进度"
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={Math.round(progress)}
				onpointerdown={onProgressDown}
				onpointermove={onProgressMove}
				onpointerup={onProgressUp}
				onpointercancel={onProgressUp}
			>
				<div class="music-fs__progress-fill" style:width={`${progress}%`}></div>
			</div>

			<div class="music-fs__row">
				<span class="music-fs__time">{currentTimeStr}</span>
				<div class="music-fs__buttons">
					<button class="music-fs__btn" class:on={playMode !== 0} onclick={cycleMode} aria-label="播放模式">
						{#if playMode === 2}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
						{:else if playMode === 1}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/></svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
						{/if}
					</button>
					<button class="music-fs__btn" onclick={prev} aria-label="上一首">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14l-10-7z"></path></svg>
					</button>
					<button class="music-fs__btn music-fs__btn--primary" onclick={toggle} aria-label={isPlaying ? "暂停" : "播放"}>
						{#if isPlaying}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5h2v14H8zM14 5h2v14h-2z"></path></svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"></path></svg>
						{/if}
					</button>
					<button class="music-fs__btn" onclick={next} aria-label="下一首">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l10-7z"></path></svg>
					</button>
					<button
						class="music-fs__btn"
						class:on={showPlaylist}
						onclick={() => (showPlaylist = !showPlaylist)}
						aria-label="播放列表"
					>
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h13v2H3zM3 11h13v2H3zM3 16h9v2H3zM18 7l4 2.5L18 12z"></path></svg>
					</button>
				</div>
				<span class="music-fs__time">{durationStr}</span>
			</div>
		</div>
	</div>

	<!-- 播放列表面板 -->
	{#if showPlaylist}
		<div class="music-fs__playlist">
			<div class="music-fs__playlist-head">播放列表</div>
			{#each playlist as t, i (i)}
				<button class="music-fs__playlist-item" class:active={i === currentIndex} onclick={() => selectTrack(i)}>
					<span class="music-fs__playlist-name">{t.name}</span>
					<span class="music-fs__playlist-artist">{t.artist}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.music-fs {
		position: fixed;
		inset: 0;
		z-index: 9999;
		overflow: hidden;
		background: #0d0b09;
	}

	.music-fs__bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center right;
	}

	/* 左深右浅：左侧内容区深色可读，右侧人物图清晰 */
	.music-fs__mask {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				to right,
				rgb(13 11 9 / 0.92) 0%,
				rgb(13 11 9 / 0.78) 38%,
				rgb(13 11 9 / 0.32) 62%,
				rgb(13 11 9 / 0.08) 100%
			),
			linear-gradient(to top, rgb(13 11 9 / 0.55) 0%, transparent 28%);
	}

	/* 左半屏 */
	.music-fs__left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 50%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 6.5rem 1.25rem 1.5rem 1.5rem;
		box-sizing: border-box;
	}

	.music-fs__hero {
		display: grid;
		grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
		align-items: center;
		gap: 0.75rem;
		flex: 1;
		min-height: 0;
	}

	.music-fs__lyrics {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
	}
	.music-fs__lyric {
		margin: 0;
		color: rgb(232 224 208 / 0.42);
		font-size: clamp(0.82rem, 1.4vw, 1.05rem);
		line-height: 1.5;
		transition: color 0.3s ease, transform 0.3s ease;
	}
	.music-fs__lyric.active {
		color: #a98b4e;
		font-weight: 700;
		transform: translateX(0.3rem);
	}
	.music-fs__lyric--placeholder {
		color: rgb(232 224 208 / 0.25);
	}

	.music-fs__center {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.music-fs__vinyl-wrap {
		position: relative;
		width: clamp(11rem, 23vw, 19rem);
		aspect-ratio: 1;
	}
	.music-fs__vinyl {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background:
			repeating-radial-gradient(circle at center, #181410 0, #0c0a08 2px, #181410 3px, #0c0a08 5px),
			#0c0a08;
		box-shadow:
			0 1.6rem 3.2rem rgb(0 0 0 / 0.5),
			0 0 0 1px rgb(255 255 255 / 0.06),
			inset 0 0 2.5rem rgb(0 0 0 / 0.8);
		animation: music-fs-spin 22s linear infinite;
		animation-play-state: paused;
	}
	.music-fs__vinyl.spinning {
		animation-play-state: running;
	}
	.music-fs__vinyl-cover {
		position: absolute;
		inset: 15%;
		border-radius: 50%;
		overflow: hidden;
		background: #1a1408;
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
	}
	.music-fs__vinyl-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.music-fs__vinyl-cover::after {
		content: "";
		position: absolute;
		inset: 50%;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: #0a0908;
		box-shadow: inset 0 0 0 2px rgb(255 255 255 / 0.12);
		transform: translate(-50%, -50%);
	}

	@keyframes music-fs-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.music-fs__title {
		margin: 1.5rem 0 0;
		color: #e8e0d0;
		font-size: clamp(1.3rem, 2.6vw, 2rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		line-height: 1.2;
		text-shadow: 0 2px 18px rgb(0 0 0 / 0.5);
	}
	.music-fs__artist {
		margin: 0.5rem 0 0;
		color: rgb(232 224 208 / 0.6);
		font-size: clamp(0.8rem, 1.3vw, 0.95rem);
		letter-spacing: 0.06em;
	}

	.music-fs__controls {
		padding: 0.9rem 0 1rem;
	}

	.music-fs__progress {
		position: relative;
		height: 2px;
		border-radius: 999px;
		background: rgb(232 224 208 / 0.14);
		cursor: pointer;
		touch-action: none;
	}
	.music-fs__progress-fill {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		border-radius: 999px;
		background: #a98b4e;
	}

	.music-fs__row {
		display: grid;
		grid-template-columns: 3rem 1fr 3rem;
		align-items: center;
		gap: 0.6rem;
		margin-top: 0.6rem;
	}
	.music-fs__time {
		color: rgb(232 224 208 / 0.55);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
	}
	.music-fs__row .music-fs__time:last-child {
		text-align: right;
	}

	.music-fs__buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
	}
	.music-fs__btn {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border: none;
		border-radius: 999px;
		color: rgb(232 224 208 / 0.85);
		background: transparent;
		cursor: pointer;
		transition: color 0.2s ease, transform 0.2s ease;
	}
	.music-fs__btn:hover {
		color: #a98b4e;
		transform: translateY(-1px);
	}
	.music-fs__btn.on {
		color: #a98b4e;
	}
	.music-fs__btn--primary {
		width: 2.9rem;
		height: 2.9rem;
		color: #1a1408;
		background: #a98b4e;
	}
	.music-fs__btn--primary:hover {
		color: #1a1408;
		transform: scale(1.05);
	}
	.music-fs__btn svg {
		width: 1.25rem;
		height: 1.25rem;
	}
	.music-fs__btn--primary svg {
		width: 1.4rem;
		height: 1.4rem;
	}

	.music-fs__playlist {
		position: absolute;
		left: 2rem;
		bottom: 8.5rem;
		z-index: 30;
		width: min(28rem, calc(50% - 2rem));
		max-height: 20rem;
		overflow-y: auto;
		padding: 1rem;
		background: rgb(20 17 13 / 0.96);
		border: 1px solid rgb(169 139 78 / 0.2);
	}
	.music-fs__playlist-head {
		margin-bottom: 0.6rem;
		padding: 0 0.4rem 0.6rem;
		border-bottom: 1px solid rgb(169 139 78 / 0.12);
		color: rgb(232 224 208 / 0.5);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
	}
	.music-fs__playlist-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.65rem 0.75rem;
		border: none;
		background: transparent;
		color: rgb(232 224 208 / 0.75);
		cursor: pointer;
		text-align: left;
	}
	.music-fs__playlist-item:hover {
		background: rgb(169 139 78 / 0.06);
	}
	.music-fs__playlist-item.active {
		color: #a98b4e;
	}
	.music-fs__playlist-name {
		font-weight: 600;
	}
	.music-fs__playlist-artist {
		color: rgb(232 224 208 / 0.4);
		font-size: 0.78rem;
	}

	@media (max-width: 768px) {
		.music-fs__left {
			width: 100%;
			padding: 6rem 1rem 1.25rem;
		}
		.music-fs__hero {
			grid-template-columns: 1fr;
		}
		.music-fs__lyrics {
			display: none;
		}
		.music-fs__vinyl-wrap {
			width: clamp(13rem, 60vw, 18rem);
		}
		.music-fs__mask {
			background:
				linear-gradient(to bottom, rgb(13 11 9 / 0.7) 0%, rgb(13 11 9 / 0.4) 45%, rgb(13 11 9 / 0.75) 100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.music-fs__vinyl {
			animation: none;
		}
	}
</style>
