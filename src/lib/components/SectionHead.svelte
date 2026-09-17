<script lang="ts">
	import Eyebrow from './Eyebrow.svelte';

	type Props = {
		eyebrow: string;
		/** Title snippet so sections can place the accent word and line breaks. */
		title?: import('svelte').Snippet;
		note?: string;
		tone?: 'light' | 'dark';
	};
	let { eyebrow, title, note, tone = 'light' }: Props = $props();
</script>

<div class="section-head" class:dark={tone === 'dark'}>
	<div>
		<Eyebrow {tone}>{eyebrow}</Eyebrow>
		{#if title}
			<h2 class="section-title">{@render title()}</h2>
		{/if}
	</div>
	{#if note}
		<p class="section-note">{note}</p>
	{/if}
</div>

<style>
	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 30px;
		margin-bottom: clamp(40px, 6vw, 72px);
		flex-wrap: wrap;
	}

	.section-title {
		margin-top: 14px;
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		line-height: 1;
		font-size: clamp(2.2rem, 5.6vw, 4.4rem);
		letter-spacing: -0.02em;
	}

	.section-note {
		max-width: 34ch;
		color: var(--color-ink-70);
		font-size: 1rem;
		text-wrap: balance;
	}
	.section-head.dark .section-note {
		color: rgba(243, 238, 226, 0.62);
	}

	/* Accent words are passed in by the parent via the title snippet. */
	.section-title :global(.accent-word) {
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.section-head {
			align-items: flex-start;
		}
	}
</style>
