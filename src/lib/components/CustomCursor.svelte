<script lang="ts">
	import { pointerIsFine } from '$lib/actions/motion';

	let el = $state<HTMLDivElement | null>(null);
	let label = $state('');
	let big = $state(false);
	let enabled = $state(false);

	$effect(() => {
		// Desktop pointer-fine only; hidden entirely on touch.
		if (!pointerIsFine()) return;

		enabled = true;
		document.body.classList.add('has-cursor');

		const onMove = (event: MouseEvent) => {
			if (!el) return;
			el.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
		};

		// Delegated so cards rendered after mount still get the label.
		const onOver = (event: MouseEvent) => {
			const target = (event.target as Element | null)?.closest('[data-cursor]');
			if (!target) return;
			label = target.getAttribute('data-cursor') ?? '';
			big = true;
		};

		const onOut = (event: MouseEvent) => {
			const from = (event.target as Element | null)?.closest('[data-cursor]');
			if (!from) return;
			const to = (event.relatedTarget as Element | null)?.closest('[data-cursor]');
			if (to === from) return;
			big = false;
		};

		window.addEventListener('mousemove', onMove);
		document.addEventListener('mouseover', onOver);
		document.addEventListener('mouseout', onOut);

		return () => {
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseover', onOver);
			document.removeEventListener('mouseout', onOut);
			document.body.classList.remove('has-cursor');
		};
	});
</script>

{#if enabled}
	<div bind:this={el} class="cursor" class:big aria-hidden="true">
		<span>{label}</span>
	</div>
{/if}

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		border: 1.5px solid #fff;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 999;
		isolation: isolate;
		mix-blend-mode: difference;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
		transition:
			width 0.22s ease,
			height 0.22s ease,
			background 0.22s ease,
			border-color 0.22s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cursor span {
		font-family: var(--font-mono);
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--color-ink);
		opacity: 0;
		transition: opacity 0.18s ease;
		white-space: nowrap;
	}

	.cursor.big {
		width: 76px;
		height: 76px;
		background: #fff;
		border-color: #fff;
		box-shadow: none;
	}
	.cursor.big span {
		opacity: 1;
	}

	/* The native cursor is hidden only while the custom one is mounted. */
	:global(body.has-cursor),
	:global(body.has-cursor a),
	:global(body.has-cursor button),
	:global(body.has-cursor [data-cursor]) {
		cursor: none;
	}
</style>
