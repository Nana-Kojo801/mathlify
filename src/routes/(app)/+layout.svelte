<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import 'iconify-icon';
	import { Circle } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import type { SvelteComponent } from 'svelte';
	import type { PageData } from './$types';
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import { browser } from '$app/environment';
	const { children, data } = $props<{ children: SvelteComponent; data: PageData }>();

	const { user, online } = $state(data)

	$effect(() => {
		if (browser) {
			window.addEventListener('offline', () => {
				onlineStore.online = false;
			});
			window.addEventListener('online', () => {
				onlineStore.online = true;
			});
		}
	})
	
</script>

{#if $navigating}
	<div class="w-full h-full grid place-content-center">
		<Circle color="purple" />
	</div>
{:else}
	<Header {user} />
	<main class="flex-grow gap-8 px-4 mt-3 overflow-auto">
		{@render children()}
	</main>
	<Footer />
{/if}
