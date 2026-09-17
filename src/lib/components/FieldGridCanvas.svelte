<script lang="ts">
	import { prefersReducedMotion } from '$lib/actions/motion';

	let wrap = $state<HTMLDivElement | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	const SPACING = 16;
	const INFLUENCE_RADIUS = 70;

	// The one intentional ambient loop on the site. It pauses whenever the
	// card scrolls out of view, and renders a single static frame under
	// reduced-motion.
	$effect(() => {
		if (!wrap || !canvas) return;

		const wrapEl = wrap;
		const canvasEl = canvas;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const reduced = prefersReducedMotion();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		let width = 0;
		let height = 0;
		let mx = -999;
		let my = -999;
		let t = 0;
		let visible = true;
		let frame: number | null = null;

		const size = () => {
			width = wrapEl.clientWidth;
			height = wrapEl.clientHeight;
			canvasEl.width = width * dpr;
			canvasEl.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			for (let y = SPACING / 2; y < height; y += SPACING) {
				for (let x = SPACING / 2; x < width; x += SPACING) {
					const dx = x - mx;
					const dy = y - my;
					const dist = Math.sqrt(dx * dx + dy * dy) || 1;
					const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
					const wobble = Math.sin(x * 0.05 + y * 0.05 + t) * 1.4;
					const ox = x + Math.cos(t * 0.6 + y * 0.04) * 1.2 + (dx / dist) * influence * 7;
					const oy = y + wobble + (dy / dist) * influence * 7;

					ctx.beginPath();
					ctx.arc(ox, oy, 1 + influence * 2.2, 0, Math.PI * 2);
					ctx.fillStyle =
						influence > 0.08 ? '#DE4222' : `rgba(243,238,226,${0.22 + influence * 0.3})`;
					ctx.fill();
				}
			}
		};

		const loop = () => {
			if (visible) {
				t += 0.02;
				draw();
			}
			frame = requestAnimationFrame(loop);
		};

		const onMove = (event: MouseEvent) => {
			const rect = wrapEl.getBoundingClientRect();
			mx = event.clientX - rect.left;
			my = event.clientY - rect.top;
		};
		const onLeave = () => {
			mx = -999;
			my = -999;
		};

		size();
		window.addEventListener('resize', size);
		wrapEl.addEventListener('mousemove', onMove);
		wrapEl.addEventListener('mouseleave', onLeave);

		let observer: IntersectionObserver | undefined;
		if (reduced) {
			draw();
		} else {
			if ('IntersectionObserver' in window) {
				observer = new IntersectionObserver(
					(entries) => {
						visible = entries[0].isIntersecting;
					},
					{ threshold: 0 }
				);
				observer.observe(wrapEl);
			}
			loop();
		}

		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			observer?.disconnect();
			window.removeEventListener('resize', size);
			wrapEl.removeEventListener('mousemove', onMove);
			wrapEl.removeEventListener('mouseleave', onLeave);
		};
	});
</script>

<div class="canvas-wrap" bind:this={wrap}>
	<canvas bind:this={canvas} aria-hidden="true"></canvas>
</div>

<style>
	.canvas-wrap {
		position: relative;
		height: 130px;
		border-radius: 4px;
		overflow: hidden;
		background: #0f0d0a;
		margin-top: 16px;
		border: 1px solid var(--color-dark-line);
	}
	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
