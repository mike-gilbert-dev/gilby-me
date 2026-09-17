<script lang="ts">
	import type { SocialId } from '$lib/data/site';

	let { id }: { id: SocialId } = $props();

	const paths: Record<SocialId, string> = {
		linkedin:
			'M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.8v2.05h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.66 1.8-2.66 3.65V23h-4V8Z'
	};
</script>

<svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[id]} /></svg>

<style>
	svg {
		width: 15px;
		height: 15px;
		fill: rgba(243, 238, 226, 0.85);
	}
</style>
