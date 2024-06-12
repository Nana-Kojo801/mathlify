<script lang="ts">
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import { type User } from '$lib/types';
	const { user } = $props<{ user: User | null }>();
</script>

<header class="flex justify-between items-center py-3 px-6">
	<p class="text-purple-900 text-2xl font-bold">Mathlify</p>
	{#if onlineStore.online}
		{#if user === null}
			<a href="/login" class="py-2 px-4 text-white rounded-lg text-base bg-purple-900">Login</a>
		{:else}
			<form method="post">
				<button
					formaction="?/logout"
					class="py-2 px-4 flex items-center gap-2 rounded-lg text-purple-900 text-lg"
				>
					<iconify-icon icon="ic:baseline-logout"></iconify-icon>
					Logout
				</button>
			</form>
		{/if}
	{/if}
</header>
