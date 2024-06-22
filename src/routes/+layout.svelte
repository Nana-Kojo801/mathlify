<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import '../app.css';
	import 'iconify-icon';
	import { onDestroy, type SvelteComponent } from 'svelte';
	const { children } = $props<{ children: SvelteComponent; }>();

	$effect(() => {
		onlineStore.online = navigator.onLine
		invalidateAll()
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('online', onlineStore.onlineHandler);
		window.removeEventListener('offline', onlineStore.offlineHandler);
	});

</script>

<div class="w-screen h-dvh flex flex-col overflow-auto relative">
	{@render children()}
</div>
