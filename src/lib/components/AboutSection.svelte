<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { asset } from '$app/paths';
	import { site, skills, resume } from '$lib/data/site';
	import SectionHead from './SectionHead.svelte';
</script>

<section id="about">
	<div class="wrap section-pad">
		<div class="reveal" use:reveal>
			<SectionHead eyebrow="Section 04 — About" />
		</div>

		<div class="about-grid">
			<div class="reveal" use:reveal>
				<p class="about-lede">
					Working at the intersection of <span class="accent-word">design</span> and
					<span class="accent-word">code.</span>
				</p>
				<p class="about-copy">
					Mike Gilbert is a designer and developer based in Baltimore, working on the web team at
					Inside Lacrosse, where he moves between building the product and shaping the editorial
					work that runs on it.
				</p>
				<p class="about-copy">
					Outside of that, he builds CollegeSoccer.io independently — concept, design, and
					engineering — and keeps a running list of smaller experiments in Labs, because building
					things he's curious about is half the point.
				</p>

				<a class="btn resume-cta" href={asset(resume.file)} target="_blank" rel="noopener">
					View Resume ↗
				</a>
			</div>

			<div class="reveal" use:reveal>
				<div class="skills-table">
					{#each skills as group (group.label)}
						<div class="skills-row">
							<span class="col-label">{group.label}</span>
							<span class="col-items">
								{#each group.items as item (item)}
									<span>{item}</span>
								{/each}
							</span>
						</div>
					{/each}
				</div>

				<div class="about-location">
					<svg class="crosshair" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1" />
						<path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" stroke-width="1" />
					</svg>
					<span>{site.location}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: clamp(30px, 5vw, 70px);
	}

	.about-lede {
		font-family: var(--font-display);
		font-weight: 600;
		text-transform: uppercase;
		font-size: clamp(1.6rem, 3.2vw, 2.5rem);
		line-height: 1.08;
		letter-spacing: -0.005em;
	}
	.about-lede .accent-word {
		color: var(--color-accent);
	}

	.about-copy {
		margin-top: 22px;
		color: var(--color-ink-70);
		max-width: 52ch;
		font-size: 1.02rem;
	}
	.about-copy + .about-copy {
		margin-top: 14px;
	}

	.resume-cta {
		margin-top: 30px;
	}

	.skills-table {
		border-top: 1px solid var(--color-line);
		margin-top: 8px;
	}
	.skills-row {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 16px;
		padding-block: 14px;
		border-bottom: 1px solid var(--color-line);
	}
	.col-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
	}
	.col-items {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		font-size: 0.92rem;
		color: var(--color-ink-70);
	}

	.about-location {
		margin-top: 30px;
		display: flex;
		align-items: center;
		gap: 14px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-ink-45);
	}
	.crosshair {
		width: 20px;
		height: 20px;
		flex: none;
	}

	@media (max-width: 980px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
