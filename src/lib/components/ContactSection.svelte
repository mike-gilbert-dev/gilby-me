<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { site, socials } from '$lib/data/site';
	import Eyebrow from './Eyebrow.svelte';
	import SocialIcon from './SocialIcon.svelte';
</script>

<section class="contact" id="contact">
	<div class="wrap section-pad">
		<div class="reveal" use:reveal>
			<Eyebrow tone="dark">Section 05 — Contact</Eyebrow>
		</div>

		<h2 class="contact-title reveal" use:reveal>
			Let's Build<br /><span class="accent-word">Something.</span>
		</h2>

		<!-- TODO: contact form goes here. There is deliberately no email
		     address on the site in the meantime — reach-outs go via the
		     social links below. -->

		<footer class="site-foot">
			<div class="foot-brand"><span class="rule"></span> {site.wordmark}</div>
			<div class="socials">
				{#each socials as social (social.id)}
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external profile URLs only -->
					<a
						href={social.href}
						aria-label={social.label}
						target={social.href.startsWith('http') ? '_blank' : undefined}
						rel={social.href.startsWith('http') ? 'noopener' : undefined}
					>
						<SocialIcon id={social.id} />
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{/each}
			</div>
		</footer>
	</div>
</section>

<style>
	.contact {
		background: var(--color-ink);
		color: var(--color-dark-ink);
		text-align: left;
	}

	.contact-title {
		margin-top: 16px;
		font-family: var(--font-display);
		font-weight: 900;
		text-transform: uppercase;
		line-height: 0.98;
		font-size: clamp(2.3rem, 6.8vw, 5.4rem);
		letter-spacing: -0.02em;
	}
	.contact-title .accent-word {
		color: var(--color-accent);
	}

	.site-foot {
		border-top: 1px solid rgba(243, 238, 226, 0.14);
		margin-top: clamp(50px, 8vw, 90px);
		padding-top: 26px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 16px;
	}

	.foot-brand {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		color: rgba(243, 238, 226, 0.65);
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.foot-brand .rule {
		width: 26px;
		height: 1px;
		background: var(--color-accent);
		display: inline-block;
	}

	.socials {
		display: flex;
		gap: 16px;
	}
	.socials a {
		width: 34px;
		height: 34px;
		border: 1px solid rgba(243, 238, 226, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			border-color 0.25s ease,
			background 0.25s ease;
	}
	.socials a:hover {
		border-color: var(--color-accent);
		background: var(--color-accent);
	}
</style>
