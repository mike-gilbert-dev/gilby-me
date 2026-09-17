<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import Grain from '$lib/components/Grain.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<!-- Fallback for browsers that don't take SVG icons. -->
	<link rel="alternate icon" href={asset('/favicon.png')} sizes="32x32" type="image/png" />
	<link rel="apple-touch-icon" href={asset('/apple-touch-icon.png')} />
</svelte:head>

<Grain />
<CustomCursor />

{@render children()}
