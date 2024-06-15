<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite/client/appwrite';
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import { type User } from '$lib/types';
	const { user } = $props<{ user: User | null }>();

	let loggingOut = $state<boolean>(false);

	const logout = async () => {
		try {
			loggingOut = true;
			await fetch("/api/logout", { method: "POST"})
			invalidateAll();
		} catch {
			loggingOut = false
		}
	};
</script>

<header class="flex justify-between items-center py-3 px-6">
	<p class="text-purple-900 text-2xl font-bold">Mathlify</p>
	{#if onlineStore.online}
		{#if user === null}
			<a href="/login" class="py-2 px-4 text-white rounded-lg text-base bg-purple-900">Login</a>
		{:else}
			<button
				onclick={logout}
				disabled={loggingOut}
				class="py-2 px-4 flex items-center gap-2 rounded-lg disabled:text-gray-500 text-purple-900 text-lg"
			>
				<iconify-icon icon="ic:baseline-logout"></iconify-icon>
				{loggingOut ? 'Logging out...' : 'Logout'}
			</button>
		{/if}
	{/if}
</header>
