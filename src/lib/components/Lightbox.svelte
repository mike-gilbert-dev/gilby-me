<script lang="ts">
	import { prefersReducedMotion } from '$lib/actions/motion';
	import type { GalleryPiece } from '$lib/data/site';

	type Props = {
		pieces: GalleryPiece[];
		index: number;
		onClose: () => void;
		onNavigate: (index: number) => void;
	};
	let { pieces, index, onClose, onNavigate }: Props = $props();

	let dialog = $state<HTMLDivElement | null>(null);

	const piece = $derived(pieces[index]);
	const multiple = $derived(pieces.length > 1);
	const reduced = prefersReducedMotion();

	function go(step: number) {
		onNavigate((index + step + pieces.length) % pieces.length);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
			return;
		}

		if (event.key === 'ArrowLeft' && multiple) {
			event.preventDefault();
			go(-1);
			return;
		}

		if (event.key === 'ArrowRight' && multiple) {
			event.preventDefault();
			go(1);
			return;
		}

		// Keep Tab inside the dialog while it is open.
		if (event.key !== 'Tab' || !dialog) return;

		const focusable = dialog.querySelectorAll<HTMLElement>(
			'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
		);
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && (active === first || !dialog.contains(active))) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		// Lock scroll, compensating for the scrollbar so the page doesn't shift.
		const gutter = window.innerWidth - document.documentElement.clientWidth;
		const prevOverflow = document.body.style.overflow;
		const prevPadding = document.body.style.paddingRight;
		document.body.style.overflow = 'hidden';
		if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

		dialog?.focus();

		return () => {
			document.body.style.overflow = prevOverflow;
			document.body.style.paddingRight = prevPadding;
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Backdrop. Clicking it closes; the panel stops propagation.
     Pointer-only convenience: keyboard users close via Escape or the
     focusable Close button, so no key handler belongs on the backdrop. -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="backdrop"
	class:animate={!reduced}
	role="presentation"
	onclick={onClose}
	onwheel={(event) => event.preventDefault()}
>
	<div
		class="panel"
		bind:this={dialog}
		role="dialog"
		aria-modal="true"
		aria-label="{piece.name} — {piece.category}"
		tabindex="-1"
		onclick={(event) => event.stopPropagation()}
	>
		<div class="panel-head">
			<span class="counter">{String(index + 1).padStart(2, '0')} / {pieces.length}</span>
			<button class="close" onclick={onClose}>Close ✕</button>
		</div>

		<!-- Shows the high-res variant when one exists. Auto sizing means the
		     image never scales past its own resolution, so it stays sharp. -->
		<div class="plate">
			<img src={piece.large ?? piece.src} alt={piece.alt} />
		</div>

		<div class="panel-foot">
			<div class="meta">
				<span class="name">{piece.name}</span>
				<span class="cat">{piece.category}</span>
			</div>

			{#if multiple}
				<div class="nav">
					<button onclick={() => go(-1)} aria-label="Previous piece">←</button>
					<button onclick={() => go(1)} aria-label="Next piece">→</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		/* Below the custom cursor (999) and grain (998). */
		z-index: 900;
		background: rgba(15, 13, 9, 0.84);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(16px, 4vw, 48px);
		overflow: auto;
	}
	.backdrop.animate {
		animation: fade 0.24s ease both;
	}

	.panel {
		background: var(--color-paper);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		padding: clamp(14px, 2vw, 20px);
		max-width: min(100%, 880px);
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.panel:focus {
		outline: none;
	}
	.backdrop.animate .panel {
		animation: rise 0.28s var(--ease-out-soft) both;
	}

	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.counter {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		color: var(--color-ink-45);
	}

	.close {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-ink-70);
		transition: color 0.2s ease;
	}
	.close:hover {
		color: var(--color-accent);
	}

	.plate {
		background: var(--color-canvas);
		border: 1px solid var(--color-line);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(12px, 3vw, 28px);
	}

	/* No upscaling: renders at intrinsic resolution, shrinking only when the
	   viewport demands it. */
	.plate img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 74vh;
		border-radius: 2px;
	}

	.panel-foot {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.meta .name {
		font-family: var(--font-display);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 1.15rem;
		line-height: 1;
	}
	.meta .cat {
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.nav {
		display: flex;
		gap: 8px;
	}
	.nav button {
		width: 34px;
		height: 34px;
		border: 1px solid var(--color-line-strong);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.95rem;
		color: var(--color-ink-70);
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}
	.nav button:hover {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-ink);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.backdrop,
		.panel {
			animation: none;
		}
		.close,
		.nav button {
			transition: none;
		}
	}
</style>
