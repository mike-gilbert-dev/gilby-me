<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { CaseStudy } from '$lib/data/site';

	let { study }: { study: CaseStudy } = $props();
</script>

<!-- The two case cards are deliberately parallel: same structure,
     different background treatment only. -->
<article
	class="case-card reveal"
	class:case-il={study.theme === 'il'}
	class:case-csio={study.theme === 'csio'}
	use:reveal
>
	<div class="case-top">
		{#if study.logo}
			<img class="case-logo" src={study.logo} alt="" />
		{:else if study.monogram}
			<span class="case-monogram" aria-hidden="true">{study.monogram}</span>
		{/if}
		<span class="case-index">{study.index}</span>
	</div>

	<div>
		<span class="case-eyebrow">{study.eyebrow}</span>
		<h3 class="case-title">{study.title[0]}<br />{study.title[1]}</h3>
		<p class="case-sub">{study.description}</p>

		<div class="stat-row">
			{#each study.stats as stat (stat.label)}
				<div>
					<span class="stat-num">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>

		<div class="feature-panel">
			{#each study.features as feature (feature.label)}
				<div class="row">
					<span>{feature.label}</span>
					<span class="pill">{feature.pill}</span>
				</div>
			{/each}
		</div>

		<a href={study.href} target="_blank" rel="noopener" class="case-link">{study.linkLabel} ↗</a>
	</div>
</article>

<style>
	.case-card {
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(28px, 3vw, 44px);
		min-height: 520px;
	}

	.case-il {
		background: var(--color-ink);
		color: var(--color-dark-ink);
		background-image: radial-gradient(ellipse at 78% 12%, rgba(222, 66, 34, 0.28), transparent 55%);
	}

	.case-csio {
		background: #101014;
		color: #efe9dd;
		background-image: radial-gradient(
			ellipse at 20% 100%,
			rgba(222, 66, 34, 0.32),
			transparent 60%
		);
	}

	.case-top {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 14px;
	}

	.case-logo {
		width: 38px;
		height: 38px;
		filter: brightness(0) saturate(100%) invert(85%);
	}

	.case-monogram {
		width: 38px;
		height: 38px;
		border: 1px solid rgba(239, 233, 221, 0.35);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.82rem;
		letter-spacing: -0.02em;
		color: #fff;
		flex: none;
	}

	.case-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(243, 238, 226, 0.55);
	}

	.case-index {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: rgba(243, 238, 226, 0.4);
	}

	.case-title {
		position: relative;
		z-index: 2;
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		line-height: 1;
		font-size: clamp(1.9rem, 3.4vw, 2.9rem);
		letter-spacing: -0.015em;
		margin-top: auto;
		padding-top: 16px;
	}

	.case-sub {
		position: relative;
		z-index: 2;
		font-size: 0.98rem;
		color: rgba(239, 233, 221, 0.72);
		max-width: 44ch;
		margin-top: 14px;
		text-wrap: balance;
	}

	.stat-row {
		position: relative;
		z-index: 2;
		display: flex;
		gap: clamp(18px, 3vw, 34px);
		margin-top: 26px;
		flex-wrap: wrap;
	}
	.stat-row div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.stat-num {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(1.5rem, 2.4vw, 2.1rem);
		color: #fff;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.63rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(239, 233, 221, 0.55);
	}

	.feature-panel {
		position: relative;
		z-index: 2;
		margin-top: 22px;
		border: 1px solid rgba(239, 233, 221, 0.18);
		border-radius: 4px;
		padding: 14px 16px;
		background: rgba(255, 255, 255, 0.03);
	}
	.feature-panel .row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: rgba(239, 233, 221, 0.7);
		padding-block: 6px;
		border-bottom: 1px solid rgba(239, 233, 221, 0.08);
	}
	.feature-panel .row:last-child {
		border-bottom: none;
	}
	.feature-panel .pill {
		background: var(--color-accent);
		color: #fff;
		padding: 0.15em 0.6em;
		border-radius: 20px;
		font-size: 0.62rem;
		white-space: nowrap;
	}

	.case-link {
		position: relative;
		z-index: 2;
		margin-top: 22px;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #fff;
		width: fit-content;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);
		padding-bottom: 2px;
		transition:
			border-color 0.25s ease,
			color 0.25s ease;
	}
	.case-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	@media (max-width: 980px) {
		.case-card {
			min-height: 420px;
		}
	}
	@media (max-width: 640px) {
		.stat-row {
			gap: 16px;
		}
	}
</style>
