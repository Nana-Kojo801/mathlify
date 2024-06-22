<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import clickOutside from '$lib/actions/ClickOutside';
	import { getUserImage } from '$lib/appwrite/api';
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import type { User } from '$lib/types';

	const { user } = $props<{ user: User | null }>();

	let showDropDown = $state<boolean>(false);
	let loggingOut = $state(false);

	const logout = async () => {
		console.log('loggi ut');
		loggingOut = true;
		await fetch('/api/auth/logout', { method: 'POST' });
		await invalidate('appwrite:auth');
		goto('/');
		loggingOut = false;
	};
</script>

<header class="flex justify-between items-center py-3 px-6 relative">
	<p class="text-purple-900 text-2xl font-bold">Mathlify</p>
	{#if onlineStore.online}
		{#if user === null}
			<a href="/login" class="py-2 px-4 text-white rounded-lg text-base bg-purple-900">Login</a>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		{:else}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<button
				onclick={(e) => {
					e.stopPropagation()
					showDropDown = !showDropDown;
				}}
				use:clickOutside={() => (showDropDown = false)}
				class="flex items-center gap-4"
			>
				<img
					class="w-[40px] aspect-square rounded-full object-cover"
					src={user?.image}
					alt="User profile"
				/>
			</button>
		{/if}
	{/if}
</header>
