<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import 'iconify-icon';
	import { navigating } from '$app/stores';
	import { type Snippet } from 'svelte';
	import type { PageData } from './$types';
	import { Pages } from '$lib/SkeletonPages';
	import { appwriteClient } from '$lib/appwrite/client/appwrite';
	import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID } from '$env/static/public';
	import { messageStore } from '$lib/stores/messageStore.svelte';
	import type { Models } from 'node-appwrite';
	const { children, data } = $props<{ children: Snippet; data: PageData }>();

	$effect(() => {
		appwriteClient.subscribe([`databases.${PUBLIC_APPWRITE_DATABASE_ID}.collections.${PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID}.documents`], (response) => {
			console.log(response);
			if(response.events.includes("databases.*.collections.*.documents.*.create")) {
				messageStore.addMessage(response.payload as Models.Document)
			} else if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
				messageStore.deleteMessage(response.payload?.$id as string)
			}
		})
	})

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
