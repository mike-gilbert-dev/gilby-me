<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { labs } from '$lib/data/site';
	import SectionHead from './SectionHead.svelte';
	import LabCard from './LabCard.svelte';
</script>

<section class="labs" id="labs">
	<div class="wrap section-pad">
		<div class="reveal" use:reveal>
			<SectionHead
				eyebrow="Section 03 — Labs"
				tone="dark"
				note="Experiments, tools, data, and games — the space between design and development, built for the fun of building."
			>
				{#snippet title()}
					Small Projects.<br />Big <span class="accent-word">Curiosity.</span>
				{/snippet}
			</SectionHead>
		</div>

		{#if labs.length > 0}
			<div class="labs-grid">
				{#each labs as lab (lab.num)}
					<LabCard {lab} />
				{/each}
			</div>
		{:else}
			<div class="labs-empty reveal" use:reveal>
				<span class="rule"></span>
				<span class="marker">Nothing published yet</span>
				<h3>No Experiments<br />To Show Yet</h3>
				<p>
					Nothing here is worth sharing at the moment. When an experiment is ready to stand on its
					own, this is where it lands.
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.labs {
		background: var(--color-dark-canvas);
		color: var(--color-dark-ink);
	}

	/* Three equal cards, no offsets — reads as a clean grid. */
	.labs-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 22px;
	}

	/* Empty state. Dashed border so it reads as a placeholder rather than
	   a card that failed to load. */
	.labs-empty {
		border: 1px dashed rgba(243, 238, 226, 0.22);
		border-radius: 6px;
		padding: clamp(44px, 7vw, 76px) clamp(24px, 4vw, 40px);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
	}

	.labs-empty .rule {
		width: 26px;
		height: 1px;
		background: var(--color-accent);
	}

	.labs-empty .marker {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(243, 238, 226, 0.42);
	}

	.labs-empty h3 {
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		font-size: clamp(1.5rem, 3.4vw, 2.3rem);
		line-height: 1.02;
		letter-spacing: -0.015em;
	}

	.labs-empty p {
		max-width: 46ch;
		font-size: 0.98rem;
		color: rgba(243, 238, 226, 0.6);
		text-wrap: balance;
	}

	@media (max-width: 980px) {
		.labs-grid {
			grid-template-columns: 1fr 1fr;
		}
		.labs-grid > :global(*:nth-child(3)) {
			grid-column: span 2;
		}
	}
	@media (max-width: 640px) {
		.labs-grid {
			grid-template-columns: 1fr;
		}
		.labs-grid > :global(*:nth-child(3)) {
			grid-column: span 1;
		}
	}
</style>
