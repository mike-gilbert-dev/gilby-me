<script lang="ts">
	import { site } from '$lib/data/site';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import DevelopmentSection from '$lib/components/DevelopmentSection.svelte';
	import DesignGallery from '$lib/components/DesignGallery.svelte';
	import LabsSection from '$lib/components/LabsSection.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content={site.name} />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<Nav />

<main id="top">
	<Hero />
	<DevelopmentSection />
	<DesignGallery />
	<LabsSection />
	<AboutSection />
	<ContactSection />
</main>
