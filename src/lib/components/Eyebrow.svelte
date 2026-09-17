<script lang="ts">
	type Props = { children: import('svelte').Snippet; tone?: 'light' | 'dark' };
	let { children, tone = 'light' }: Props = $props();
</script>

<span class="eyebrow" class:dark={tone === 'dark'}>{@render children()}</span>

<style>
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-45);
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
	}
	.eyebrow.dark {
		color: rgba(243, 238, 226, 0.5);
	}
	.eyebrow::before {
		content: '';
		width: 7px;
		height: 7px;
		background: var(--color-accent);
		border-radius: 1px;
		display: inline-block;
		flex: none;
	}
</style>
