<script lang="ts">
	import { tick } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { galleryPieces } from '$lib/data/site';
	import SectionHead from './SectionHead.svelte';
	import GalleryItem from './GalleryItem.svelte';
	import Lightbox from './Lightbox.svelte';

	// null = closed. Holds the index so the lightbox can page through pieces.
	let openIndex = $state<number | null>(null);
	let galleryEl = $state<HTMLDivElement | null>(null);

	/**
	 * Restore focus by index rather than by remembering the clicked element:
	 * a click doesn't always focus its button, and after arrow-navigating the
	 * right target is the piece the viewer ended on, not the one they opened.
	 */
	async function close() {
		const last = openIndex;
		openIndex = null;
		if (last === null) return;

		await tick();
		const tiles = galleryEl?.querySelectorAll<HTMLButtonElement>('.gallery-item');
		tiles?.[last]?.focus();
	}
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

		<div class="gallery reveal" bind:this={galleryEl} use:reveal>
			{#each galleryPieces as piece, i (piece.name)}
				<GalleryItem {piece} onOpen={() => (openIndex = i)} />
			{/each}
		</div>
	</div>
</section>

{#if openIndex !== null}
	<Lightbox
		pieces={galleryPieces}
		index={openIndex}
		onClose={close}
		onNavigate={(i) => (openIndex = i)}
	/>
{/if}

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
