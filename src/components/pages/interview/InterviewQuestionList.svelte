<script lang="ts">
	import { DIFFICULTY_LABELS } from "@/types/interview";
	import type { InterviewQuestionMeta } from "@/types/interview";
	import { url } from "@/utils/url-utils";

	interface Props {
		category: string;
		questions: InterviewQuestionMeta[];
	}

	let { category, questions }: Props = $props();

	type Filter = "all" | "easy" | "medium" | "hard";

	const filters: { value: Filter; label: string }[] = [
		{ value: "all", label: "全部" },
		{ value: "easy", label: "简单" },
		{ value: "medium", label: "中等" },
		{ value: "hard", label: "困难" },
	];

	const difficultyStyle: Record<string, string> = {
		easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
		hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
	};

	let active = $state<Filter>("all");

	let filtered = $derived(
		active === "all"
			? questions
			: questions.filter((q) => q.difficulty === active),
	);
</script>

<div>
	<div class="flex flex-wrap gap-2 mb-6">
		{#each filters as f}
			<button
				type="button"
				class:list={[
					"px-4 py-1.5 rounded-full text-sm border transition-colors cursor-pointer",
					active === f.value
						? "bg-(--primary) text-white dark:text-black/70 border-(--primary)"
						: "border-(--line-divider) text-black/60 dark:text-white/60 hover:border-(--primary) hover:text-(--primary)",
				]}
				onclick={() => (active = f.value)}
			>
				{f.label}
			</button>
		{/each}
	</div>

	{#if filtered.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each filtered as q (q.slug)}
				<a
					href={url(`/interview/${category}/${q.slug}/`)}
					class="card-base p-5 flex flex-col gap-4 group hover:border-(--primary) hover:-translate-y-1 transition-all"
				>
					<span
						class="text-sm md:text-base font-medium text-black/80 dark:text-white/80 group-hover:text-(--primary) transition-colors leading-snug line-clamp-2"
					>
						{q.title}
					</span>
					<div class="mt-auto">
						<span
							class="inline-flex text-xs font-medium px-2 py-0.5 rounded {difficultyStyle[q.difficulty]}"
						>
							{DIFFICULTY_LABELS[q.difficulty]}
						</span>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p class="text-sm text-black/50 dark:text-white/50 py-10 text-center">
			该难度下暂无题目
		</p>
	{/if}
</div>
