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

		<div class="labs-grid">
			{#each labs as lab (lab.num)}
				<LabCard {lab} />
			{/each}
		</div>
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
