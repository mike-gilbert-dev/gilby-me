<script lang="ts">
	import { asset } from '$app/paths';
	import { navLinks, resume, type NavId } from '$lib/data/site';

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let active = $state<NavId>('work');

	$effect(() => {
		const sections = navLinks
			.map(({ id }) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		// Scroll-spy is computed from raw scroll position rather than
		// IntersectionObserver transitions, which broke on jump-scrolls.
		const update = () => {
			scrolled = window.scrollY > 30;

			const line = window.scrollY + window.innerHeight * 0.45;
			let current: NavId = 'work';
			for (const section of sections) {
				const top = section.getBoundingClientRect().top + window.scrollY;
				if (line >= top) current = section.id as NavId;
			}
			active = current;
		};

		let frame: number | null = null;
		const onScroll = () => {
			if (frame !== null) return;
			frame = requestAnimationFrame(() => {
				update();
				frame = null;
			});
		};

		update();
		document.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', update);

		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			document.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', update);
		};
	});
</script>

<header class="site-nav" class:scrolled>
	<div class="wrap nav-inner">
		<a href="#top" class="brand">
			<span class="brand-mark">
				<svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
					<circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="1.4" />
					<path
						d="M13 25V15l7 7 7-7v10"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<b>MIKE GILBERT</b>
		</a>

		<nav class="primary-links" aria-label="Primary">
			{#each navLinks as link (link.id)}
				<a
					href="#{link.id}"
					class:active={active === link.id}
					aria-current={active === link.id ? 'true' : undefined}>{link.label}</a
				>
			{/each}
			<a class="resume-link" href={asset(resume.file)} target="_blank" rel="noopener">
				{resume.label} <span aria-hidden="true">↗</span>
			</a>
		</nav>

		<div class="nav-right">
			<button
				class="menu-btn"
				aria-label="Open menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = true)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>
</header>

<div class="mobile-menu" class:open={menuOpen} inert={!menuOpen}>
	<button class="close-btn" onclick={() => (menuOpen = false)}>CLOSE ✕</button>
	{#each navLinks as link (link.id)}
		<a href="#{link.id}" onclick={() => (menuOpen = false)}>{link.label}</a>
	{/each}
	<a href={asset(resume.file)} target="_blank" rel="noopener" onclick={() => (menuOpen = false)}
		>{resume.label} ↗</a
	>
</div>

<style>
	.site-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 500;
		padding-block: 16px;
		background: rgba(241, 236, 224, 0);
		border-bottom: 1px solid transparent;
		transition:
			background 0.35s ease,
			border-color 0.35s ease,
			padding 0.35s ease;
	}
	.site-nav.scrolled {
		background: rgba(241, 236, 224, 0.86);
		backdrop-filter: blur(10px);
		border-color: var(--color-line);
		padding-block: 10px;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
	}
	.brand-mark {
		width: 30px;
		height: 30px;
		flex: none;
	}
	.brand-mark svg {
		width: 100%;
		height: 100%;
		display: block;
	}
	.brand b {
		font-weight: 600;
	}

	.primary-links {
		display: flex;
		align-items: center;
		gap: clamp(18px, 2.4vw, 34px);
	}
	.primary-links a {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-ink-70);
		position: relative;
		padding-block: 4px;
	}
	.primary-links a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0%;
		height: 1px;
		background: var(--color-accent);
		transition: width 0.3s ease;
	}
	.primary-links a:hover::after,
	.primary-links a.active::after {
		width: 100%;
	}
	.primary-links a.active {
		color: var(--color-ink);
	}

	.primary-links a.resume-link {
		color: var(--color-ink);
	}
	.primary-links a.resume-link span {
		font-size: 0.9em;
		opacity: 0.55;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 22px;
	}

	.menu-btn {
		display: none;
		flex-direction: column;
		gap: 5px;
		padding: 6px;
	}
	.menu-btn span {
		width: 22px;
		height: 2px;
		background: var(--color-ink);
		display: block;
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		background: var(--color-canvas);
		z-index: 600;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2px;
		padding: 32px;
		overflow: hidden;
		transform: translateY(-100%);
		visibility: hidden;
		transition:
			transform 0.45s cubic-bezier(0.7, 0, 0.2, 1),
			visibility 0s linear 0.45s;
	}
	.mobile-menu.open {
		transform: translateY(0);
		visibility: visible;
		transition:
			transform 0.45s cubic-bezier(0.7, 0, 0.2, 1),
			visibility 0s linear 0s;
	}
	.mobile-menu a {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.2rem, 11vw, 4.4rem);
		line-height: 1.15;
		text-transform: uppercase;
		border-bottom: 1px solid var(--color-line);
		padding-block: 0.15em;
	}
	.mobile-menu .close-btn {
		position: absolute;
		top: 22px;
		right: 22px;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-menu {
			transition: none;
		}
	}

	@media (max-width: 980px) {
		.primary-links {
			display: none;
		}
		.menu-btn {
			display: flex;
		}
	}
</style>
