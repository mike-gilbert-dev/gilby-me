<script lang="ts">
	import type { GalleryPiece } from '$lib/data/site';

	let { piece }: { piece: GalleryPiece } = $props();
</script>

<!-- Full colour, uniform square — no desaturation, no masonry. -->
<div class="gallery-item" data-cursor="View">
	<img src={piece.src} alt={piece.alt} loading="lazy" decoding="async" />
	<div class="info">
		<span class="name">{piece.name}</span>
		<span class="cat">{piece.category}</span>
	</div>
</div>

<style>
	.gallery-item {
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		background: var(--color-paper);
		border: 1px solid var(--color-line);
		cursor: pointer;
		aspect-ratio: 1;
	}

	.gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s var(--ease-out-soft);
	}
	.gallery-item:hover img {
		transform: scale(1.06);
	}

	.info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 14px 16px;
		background: linear-gradient(0deg, rgba(15, 13, 9, 0.86), transparent);
		color: #fff;
		transform: translateY(100%);
		transition: transform 0.4s var(--ease-out-soft);
	}
	.gallery-item:hover .info {
		transform: translateY(0);
	}

	.info .name {
		font-family: var(--font-display);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 1rem;
		line-height: 1;
	}
	.info .cat {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent-soft);
		margin-top: 4px;
		display: block;
	}

	@media (prefers-reduced-motion: reduce) {
		.gallery-item img,
		.info {
			transition: none;
		}
	}
</style>
