<script>
	import AuthModal from '$lib/components/AuthModal.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import '../app.css';
	import 'iconify-icon';
	import { Circle } from 'svelte-loading-spinners';
	import { navigating } from "$app/stores"
	const { children } = $props();

	$effect(() => {
		const getUser = async () => await userStore.getLoggedInUser();
		getUser();
	});
</script>

<div class="w-screen h-screen flex flex-col overflow-auto relative">
	{#if $navigating || userStore.loading.gettingLoggedInUser || userStore.loading.loggingOutUser || userStore.loading.settingLoggedInUser}
		<div class="w-full h-full grid place-content-center">
			<Circle color="purple" />
		</div>
	{:else}
		<Header />
		<main class="flex-grow gap-8 px-4 mt-3 overflow-auto">
			{#if authModalStore.openModal}
				<AuthModal />
			{/if}
			{@render children()}
		</main>
		<Footer />
	{/if}
</div>
