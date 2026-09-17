<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { caseStudies } from '$lib/data/site';
	import SectionHead from './SectionHead.svelte';
	import CaseCard from './CaseCard.svelte';
</script>

<section id="work">
	<div class="wrap section-pad">
		<div class="reveal" use:reveal>
			<SectionHead
				eyebrow="Section 01 — Development"
				note="Production work at scale, and an independent product built from concept to code."
			>
				{#snippet title()}
					Built &amp; <span class="accent-word">Shipped</span>
				{/snippet}
			</SectionHead>
		</div>

		<div class="dev-grid">
			{#each caseStudies as study (study.href)}
				<CaseCard {study} />
			{/each}
		</div>
	</div>
</section>

<style>
	.dev-grid {
		display: grid;
		grid-template-columns: 1.55fr 1fr;
		gap: clamp(20px, 2.4vw, 30px);
		align-items: stretch;
	}

	@media (max-width: 980px) {
		.dev-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
