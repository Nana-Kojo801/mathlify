<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import 'iconify-icon';
	import { navigating } from '$app/stores';
	import { type Snippet } from 'svelte';
	import type { PageData } from './$types';
	import { Pages } from '$lib/SkeletonPages';
	const { children, data } = $props<{ children: Snippet; data: PageData }>();

</script>

{#if $navigating}
	{@const Page = Pages($navigating.to?.url.pathname as string)}
	<Header user={data.user} />
	<main class="flex-grow gap-8 px-4 mt-3 overflow-auto">
		<Page />
	</main>
	<Footer />
{:else}
	<Header user={data.user} />
	<main class="flex-grow gap-8 px-4 mt-3 overflow-auto">
		{@render children()}
	</main>
	<Footer />
{/if}
