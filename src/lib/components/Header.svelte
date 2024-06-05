<script>
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
</script>

<header class="flex justify-between items-center py-3 px-6">
	<p class="text-purple-900 text-2xl font-bold">Mathlify</p>
	{#if userStore.user === null}
		<button
			onclick={() => (authModalStore.openModal = true)}
			class="py-2 px-4 text-white rounded-lg text-base bg-purple-900">Login</button
		>
	{:else}
		<button
			onclick={ async () => await userStore.logout()}
			class="py-2 px-4 flex items-center gap-2 rounded-lg text-purple-900 text-lg"
		>
			<iconify-icon icon="ic:baseline-logout"></iconify-icon>
			Logout
		</button>
	{/if}
</header>
