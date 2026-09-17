<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { galleryPieces } from '$lib/data/site';
	import SectionHead from './SectionHead.svelte';
	import GalleryItem from './GalleryItem.svelte';
</script>

<section id="design">
	<div class="wrap section-pad">
		<div class="reveal" use:reveal>
			<SectionHead
				eyebrow="Section 02 — Design"
				note="Identity, logos, branding, editorial and print work for teams, brands, and organizations."
			>
				{#snippet title()}
					Graphic <span class="accent-word">Design</span>
				{/snippet}
			</SectionHead>
		</div>

		<div class="gallery reveal" use:reveal>
			{#each galleryPieces as piece (piece.name)}
				<GalleryItem {piece} />
			{/each}
		</div>
	</div>
</section>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 14px;
	}

	@media (max-width: 980px) {
		.gallery {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (max-width: 640px) {
		.gallery {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
