<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	// ===== 自定义「说说」内容：改这里即可（每句一条，逐字打出后回车换行） =====
	const sayings: string[] = [
		"正在把想法，变成可以回看的文字。",
		"写代码，也写生活。",
		"Less is more，但细节即一切。",
		"慢慢来，比较快。",
	];

	// 已完成（已回车换行）的说说话，最多保留一轮，形成向上滚动
	let done: string[] = [];
	// 当前正在逐字打出的内容
	let current = "";
	let typingIndex = 0;
	let timer: number | undefined;

	const TYPE_SPEED = 75; // 每个字的打字间隔(ms)
	const LINE_PAUSE = 520; // 一条说完后的停顿(ms)

	function typeLine() {
		const full = sayings[typingIndex];
		let charIndex = 0;
		current = "";

		const step = () => {
			if (charIndex <= full.length) {
				current = full.slice(0, charIndex);
				charIndex++;
				timer = window.setTimeout(step, TYPE_SPEED);
			} else {
				// 这条打完：回车（只保留最近一条，加上当前打字行共两排），然后开始下一条
				done = [full];
				current = "";
				typingIndex = (typingIndex + 1) % sayings.length;
				timer = window.setTimeout(typeLine, LINE_PAUSE);
			}
		};
		step();
	}

	onMount(() => {
		typeLine();
	});

	onDestroy(() => {
		if (timer) window.clearTimeout(timer);
	});
</script>

<div class="sayings" aria-live="polite">
	{#each done as line}
		<p class="saying saying--done">{line}</p>
	{/each}
	<p class="saying saying--typing">
		{current}<span class="caret" aria-hidden="true"></span>
	</p>
</div>

<style>
	.sayings {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-height: 1.5em;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.saying {
		margin: 0;
	}

	.saying--done {
		color: var(--content-meta);
		opacity: 0.85;
	}

	.saying--typing {
		color: var(--text-color);
	}

	.caret {
		display: inline-block;
		width: 1px;
		height: 1em;
		margin-left: 2px;
		vertical-align: -0.15em;
		background: var(--primary);
		animation: caret-blink 0.9s steps(1) infinite;
	}

	@keyframes caret-blink {
		50% {
			opacity: 0;
		}
	}
</style>
