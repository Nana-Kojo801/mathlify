<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import 'iconify-icon';
	import { Circle } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import { onDestroy, type SvelteComponent } from 'svelte';
	import type { PageData } from './$types';
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	const { children, data } = $props<{ children: SvelteComponent; data: PageData }>();
	
	$effect(() => {
		onlineStore.online = navigator.onLine
		invalidateAll()
	});

	onDestroy(() => {
		if(!browser) return
		window.removeEventListener("online", onlineStore.onlineHandler)
		window.removeEventListener("offline", onlineStore.offlineHandler)
	})
</script>

{#if $navigating}
	<div class="w-full h-full grid place-content-center">
		<Circle color="purple" />
	</div>
{:else}
	<Header user={data?.user} />
	<main class="flex-grow gap-8 px-4 mt-3 overflow-auto">
		{@render children()}
	</main>
	<Footer />
{/if}
