<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { interactiveMotionAllowed } from '$lib/actions/motion';
	import Eyebrow from './Eyebrow.svelte';

	let nameEl = $state<HTMLHeadingElement | null>(null);

	// Subtle pointer parallax on the name only — no parallax background.
	$effect(() => {
		if (!interactiveMotionAllowed() || !nameEl) return;

		const node = nameEl;
		let frame: number | null = null;

		const onMove = (event: MouseEvent) => {
			const x = (event.clientX / window.innerWidth - 0.5) * 14;
			const y = (event.clientY / window.innerHeight - 0.5) * 10;
			if (frame !== null) return;
			frame = requestAnimationFrame(() => {
				node.style.transform = `translate(${x}px, ${y}px)`;
				frame = null;
			});
		};

		window.addEventListener('mousemove', onMove);
		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			window.removeEventListener('mousemove', onMove);
			node.style.transform = '';
		};
	});
</script>

<section class="hero">
	<div class="wrap">
		<div class="hero-top">
			<Eyebrow>Designer + Developer + Builder</Eyebrow>
		</div>

		<h1 class="hero-name" bind:this={nameEl}>MIKE<br />GILBERT</h1>

		<div class="hero-foot">
			<p class="hero-desc reveal" use:reveal>
				I design visual identities, build digital products, and experiment with ideas on the web.
			</p>
			<div class="hero-cta-row reveal" use:reveal>
				<a href="#work" class="btn">Explore The Work →</a>
				<a href="#labs" class="btn-ghost">or see labs <span class="chev">↓</span></a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding-top: clamp(150px, 22vw, 210px);
		padding-bottom: clamp(70px, 9vw, 110px);
		overflow: hidden;
	}

	.hero-top {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		margin-bottom: 18px;
	}

	.hero-name {
		position: relative;
		z-index: 2;
		font-family: var(--font-display);
		font-weight: 900;
		text-transform: uppercase;
		line-height: 0.94;
		font-size: clamp(3.1rem, 11.2vw, 9rem);
		letter-spacing: -0.025em;
		color: var(--color-ink);
	}

	.hero-foot {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 40px;
		margin-top: clamp(28px, 4vw, 46px);
		align-items: end;
	}

	.hero-desc {
		font-size: clamp(1.05rem, 1.6vw, 1.32rem);
		color: var(--color-ink-70);
		max-width: 34ch;
		text-wrap: balance;
	}

	.hero-cta-row {
		display: flex;
		align-items: center;
		gap: 22px;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.95em 1.5em;
		background: var(--color-ink);
		color: var(--color-canvas);
		border-radius: 2px;
		transition:
			transform 0.3s var(--ease-out-pop),
			background 0.3s ease;
	}
	.btn:hover {
		transform: translateY(-3px);
		background: var(--color-accent);
	}

	.btn-ghost {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-ink-70);
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.btn-ghost .chev {
		animation: bob 1.6s ease-in-out infinite;
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.btn-ghost .chev {
			animation: none;
		}
		.btn {
			transition: none;
		}
	}

	@media (max-width: 640px) {
		.hero-foot {
			grid-template-columns: 1fr;
			gap: 22px;
		}
	}
</style>
