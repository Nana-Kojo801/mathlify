<script lang="ts">
	import { offlineStore } from '$lib/stores/offlineStore.svelte';
	import { type User } from '$lib/types';
	const { user } = $props<{ user: User | null }>();
</script>

<header class="flex justify-between items-center py-3 px-6">
	<p class="text-purple-900 text-2xl font-bold">Mathlify</p>
	{#if !offlineStore.offline}
		{#if user === null}
			<a href="/login" class="py-2 px-4 text-white rounded-lg text-base bg-purple-900">Login</a>
		{:else}
			<a
				href="/logout"
				class="py-2 px-4 flex items-center gap-2 rounded-lg text-purple-900 text-lg"
			>
				<iconify-icon icon="ic:baseline-logout"></iconify-icon>
				Logout
			</a>
		{/if}
	{/if}
</header>
