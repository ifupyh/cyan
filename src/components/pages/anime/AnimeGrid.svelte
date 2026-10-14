<script lang="ts">
	import { onMount } from "svelte";
	import I18nKey from "@/i18n/i18nKey";
	import { i18n } from "@/i18n/translation";
	import type { StandardizedAnime } from "@/types/anime";
	import AnimeCard from "./AnimeCard.svelte";
	import AnimeDetailModal from "./AnimeDetailModal.svelte";

	interface Props {
		items: StandardizedAnime[];
	}

	let { items }: Props = $props();

	let selectedAnime = $state<StandardizedAnime | null>(null);

	// season_type 到 i18n key 的映射
	const SEASON_TYPE_I18N: Record<number, I18nKey> = {
		1: I18nKey.animeTypeAnime,
		2: I18nKey.animeTypeMovie,
		3: I18nKey.animeTypeDocumentary,
		4: I18nKey.animeTypeChinese,
		5: I18nKey.animeTypeDrama,
		7: I18nKey.animeTypeConcert,
	};

	// 从数据中提取实际存在的类型，每个类型一个容器
	let typeGroups = $derived(() => {
		const typeMap = new Map<number, number>();
		for (const item of items) {
			const st = item.season_type || 1;
			typeMap.set(st, (typeMap.get(st) || 0) + 1);
		}
		return Array.from(typeMap.entries())
			.sort(([a], [b]) => a - b)
			.map(([type, count]) => ({
				type,
				label: i18n(SEASON_TYPE_I18N[type] || I18nKey.animeTypeAnime),
				count,
				items: items.filter((i) => (i.season_type || 1) === type),
			}));
	});

	function openDetail(anime: StandardizedAnime) {
		selectedAnime = anime;
	}

	function closeDetail() {
		selectedAnime = null;
	}

	// 每个类型容器默认只展示约两行卡片，超过两行时显示「全部展开」
	function setupExpand() {
		document.querySelectorAll("[data-anime-group]").forEach((section) => {
			const grid = section.querySelector("[data-grid]");
			const btn = section.querySelector("[data-expand]");
			if (!grid || !btn) return;

			const cards = grid.children;
			if (cards.length === 0) return;

			const cardHeight = cards[0].offsetHeight;
			const rowGap = parseFloat(getComputedStyle(grid).rowGap) || 0;
			const twoRowsHeight = cardHeight * 2 + rowGap;

			if (grid.scrollHeight <= twoRowsHeight + 5) {
				btn.hidden = true;
				return;
			}

			grid.style.maxHeight = `${twoRowsHeight}px`;
			grid.style.overflow = "hidden";
			btn.hidden = false;
			let expanded = false;
			btn.addEventListener("click", () => {
				expanded = !expanded;
				if (expanded) {
					grid.style.maxHeight = "none";
					grid.style.overflow = "visible";
					btn.textContent = "收起";
				} else {
					grid.style.maxHeight = `${twoRowsHeight}px`;
					grid.style.overflow = "hidden";
					btn.textContent = "全部展开";
				}
			});
		});
	}

	onMount(() => {
		requestAnimationFrame(setupExpand);
	});
</script>

<div class="anime-grid">
	{#each typeGroups() as group}
		<section class="card-base-transparent px-5 py-5 md:px-7 md:py-6 mb-8" data-anime-group>
			<div class="flex items-baseline gap-3 mb-5">
				<h2 class="text-xl font-semibold text-black/85 dark:text-white/85">
					{group.label}
				</h2>
				<span class="text-[0.7rem] text-black/40 dark:text-white/40 uppercase tracking-[0.18em]">
					{group.count}
				</span>
			</div>
			<div class="anime-tilt-grid" data-grid>
				{#each group.items as anime (anime.id)}
					<AnimeCard {anime} onclick={openDetail} />
				{/each}
			</div>
			<button type="button" class="anime-expand-btn" data-expand hidden>
				全部展开
			</button>
		</section>
	{/each}

	<AnimeDetailModal anime={selectedAnime} onclose={closeDetail} />
</div>

<style>
	.anime-tilt-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 132px);
		justify-content: start;
		gap: 1.5rem 1.25rem;
	}

	.anime-expand-btn {
		display: block;
		margin: 0.75rem auto 0;
		padding: 0.4rem 1rem;
		border: 1px solid var(--line-divider);
		border-radius: 999px;
		background: transparent;
		color: var(--btn-content);
		font-size: 0.8rem;
		cursor: pointer;
		transition: color 0.2s ease, border-color 0.2s ease;
	}

	.anime-expand-btn:hover {
		color: var(--primary);
		border-color: var(--primary);
	}

	@media (max-width: 640px) {
		.anime-tilt-grid {
			grid-template-columns: repeat(auto-fill, 108px);
			gap: 1.25rem 1rem;
		}
	}
</style>
