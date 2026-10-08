<script lang="ts">
	import { onMount } from "svelte";

	interface CommunityTab {
		name: string;
		url: string;
		path: string;
	}

	const tabs: CommunityTab[] = [
		{ name: "友链", url: "/friends/?embed=1", path: "/friends/" },
		{ name: "朋友圈", url: "/moments/?embed=1", path: "/moments/" },
		{ name: "留言", url: "/guestbook/?embed=1", path: "/guestbook/" },
	];

	let active = $state(0);
	// 每个 iframe 的高度：初始给一个占位高度，收到嵌入页上报的内容高度后再撑开，
	// 这样内容跟着页面一起滚动，而不是 iframe 内部滚动
	let heights = $state<number[]>(tabs.map(() => 720));

	onMount(() => {
		const onMessage = (event: MessageEvent) => {
			const data = event.data;
			if (!data || data.type !== "community-embed-height") return;
			const idx = tabs.findIndex((t) => t.path === data.path);
			if (idx < 0 || !data.height) return;
			const next = data.height + 20;
			if (Math.abs(heights[idx] - next) > 2) {
				heights = heights.map((h, i) => (i === idx ? next : h));
			}
		};
		window.addEventListener("message", onMessage);

		// 主题同步：监听父页面 dark 状态变化，通知 iframe 内页面跟随切换
		const sendTheme = () => {
			const dark = document.documentElement.classList.contains("dark");
			document
				.querySelectorAll<HTMLIFrameElement>(".community-tabs__frame")
				.forEach((frame) => {
					frame.contentWindow?.postMessage(
						{ type: "community-embed-theme", dark },
						"*",
					);
				});
		};
		const themeObserver = new MutationObserver(sendTheme);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			window.removeEventListener("message", onMessage);
			themeObserver.disconnect();
		};
	});
</script>

<div class="community-tabs">
	<div class="community-tabs__bar" role="tablist" aria-label="社区栏目">
		{#each tabs as tab, i (tab.name)}
			<button
				type="button"
				class="community-tabs__pill"
				class:active={i === active}
				role="tab"
				aria-selected={i === active}
				onclick={() => (active = i)}
			>
				{tab.name}
			</button>
		{/each}
	</div>

	<div class="community-tabs__content">
		{#each tabs as tab, i (tab.name)}
			{#if i === active}
				<iframe
					class="community-tabs__frame"
					src={tab.url}
					title={tab.name}
					loading="lazy"
					style={`height:${heights[i]}px`}
					onload={(e) => {
						const frame = e.currentTarget as HTMLIFrameElement;
						frame.contentWindow?.postMessage(
							{
								type: "community-embed-theme",
								dark: document.documentElement.classList.contains("dark"),
							},
							"*",
						);
					}}
				></iframe>
			{/if}
		{/each}
	</div>
</div>

<style>
	.community-tabs {
		display: flex;
		flex-direction: column;
	}

	.community-tabs__bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.community-tabs__pill {
		padding: 0.4rem 1rem;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: var(--btn-content);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		position: relative;
		transition: color 0.25s ease;
	}

	.community-tabs__pill::after {
		content: "";
		position: absolute;
		left: 50%;
		bottom: 2px;
		width: 0;
		height: 2px;
		border-radius: 999px;
		background: #f472b6;
		transform: translateX(-50%);
		transition: width 0.25s ease;
		pointer-events: none;
	}

	.community-tabs__pill:hover {
		color: var(--primary);
	}

	.community-tabs__pill.active {
		color: #f472b6;
		font-weight: 600;
	}

	.community-tabs__pill.active::after,
	.community-tabs__pill:hover::after {
		width: 55%;
	}

	.community-tabs__content {
		position: relative;
	}

	.community-tabs__frame {
		display: block;
		width: 100%;
		border: none;
		border-radius: var(--radius-large, 14px);
		background: var(--card-bg, #fff);
		transition: height 0.2s ease;
	}
</style>
