<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Grain from '$lib/components/Grain.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Grain />
<CustomCursor />

{@render children()}
