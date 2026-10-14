<script lang="ts">
	import Icon from "@/components/common/Icon.svelte";

	type SocialLink = {
		name: string;
		icon: string;
		url: string;
		kind: "url" | "copy" | "mail";
		copyValue?: string;
	};

	export let links: SocialLink[] = [];

	let copiedName = "";
	let copyTimer: number | undefined;

	function copy(link: SocialLink) {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(link.copyValue || "");
		}
		copiedName = link.name;
		if (copyTimer) window.clearTimeout(copyTimer);
		copyTimer = window.setTimeout(() => {
			copiedName = "";
		}, 1400);
	}
</script>

<div class="social-links">
	{#each links as link}
		{#if link.kind === "copy"}
			<button
				type="button"
				class="social-link"
				title={copiedName === link.name ? "已复制" : `复制 ${link.name}`}
				aria-label={link.name}
				on:click={() => copy(link)}
			>
				<Icon icon={link.icon} />
			</button>
		{:else if link.kind === "mail"}
			<a class="social-link" href={link.url} title={link.name} aria-label={link.name}>
				<Icon icon={link.icon} />
			</a>
		{:else}
			<a
				class="social-link"
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				title={link.name}
				aria-label={link.name}
			>
				<Icon icon={link.icon} />
			</a>
		{/if}
	{/each}
</div>

<style>
	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.social-link {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border: none;
		border-radius: 0.7rem;
		background: var(--btn-regular-bg);
		color: var(--btn-content);
		cursor: pointer;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			color 0.15s ease,
			background-color 0.15s ease;
	}

	.social-link:hover {
		color: var(--primary);
		transform: translateY(-2px);
	}

	.social-link :global(svg) {
		font-size: 1.3rem;
	}
</style>
