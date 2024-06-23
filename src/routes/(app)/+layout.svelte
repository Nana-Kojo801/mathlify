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
	import { invalidate } from '$app/navigation';
	const { children, data } = $props<{ children: Snippet; data: PageData }>();

	$effect(() => {
		const unsub = appwriteClient.subscribe([`databases.${PUBLIC_APPWRITE_DATABASE_ID}.collections.${PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID}.documents`], async (response) => {
			console.log(response);
			if(response.events.includes("databases.*.collections.*.documents.*.create")) {
				messageStore.addMessage(response.payload as Models.Document)
				if (location.pathname !== "/chat") {
					console.log('not in chat');
					
					await fetch(`/api/user/${data.user.$id}`, {
						method: "PUT",
						headers: {'Content-type': 'application/json'},
						body: JSON.stringify({ unread_messages: data.user?.unread_messages + 1 })
					})
					await invalidate("appwrite:auth")
				}
			} else if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
				messageStore.deleteMessage(response.payload?.$id as string)
			}
		})

		return () => {
			unsub()
		}
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
