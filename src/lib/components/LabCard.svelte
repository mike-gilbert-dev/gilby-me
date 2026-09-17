<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { tilt } from '$lib/actions/tilt';
	import type { Lab } from '$lib/data/site';
	import FieldGridCanvas from './FieldGridCanvas.svelte';

	let { lab }: { lab: Lab } = $props();
</script>

<article class="lab-card reveal" data-cursor={lab.cursor} use:reveal use:tilt>
	<div>
		<div class="lab-num">LAB / <b>{lab.num}</b></div>
		<h3 class="lab-title">{lab.title}</h3>
		<p class="lab-desc">{lab.description}</p>
	</div>

	{#if lab.canvas}
		<FieldGridCanvas />
	{:else if lab.tags}
		<div class="lab-tags">
			{#each lab.tags as tag (tag)}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	{/if}
</article>

<style>
	.lab-card {
		position: relative;
		background: var(--color-dark-paper);
		border: 1px solid var(--color-dark-line);
		border-radius: 6px;
		padding: 26px;
		min-height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition:
			transform 0.25s ease,
			border-color 0.3s ease;
		transform-style: preserve-3d;
		will-change: transform;
	}
	.lab-card:hover {
		border-color: rgba(222, 66, 34, 0.5);
	}

	.lab-num {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		color: rgba(243, 238, 226, 0.4);
	}
	.lab-num b {
		color: var(--color-accent);
	}

	.lab-title {
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		font-size: 1.7rem;
		line-height: 1;
		margin-top: 20px;
	}

	.lab-desc {
		font-size: 0.9rem;
		color: rgba(243, 238, 226, 0.6);
		margin-top: 12px;
		max-width: 38ch;
	}

	.lab-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		margin-top: 18px;
	}
	.tag {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.4em 0.75em;
		border: 1px solid rgba(243, 238, 226, 0.22);
		border-radius: 2px;
		color: rgba(243, 238, 226, 0.7);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		.lab-card {
			transition: border-color 0.3s ease;
		}
	}
</style>
