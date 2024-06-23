<script lang="ts">
	import autoResize from '$lib/actions/AutoResize.js';
	import { getUserImage } from '$lib/appwrite/api.js';
	import useLoading from '$lib/customHooks/useLoading.svelte.js';
	import { messageStore } from '$lib/stores/messageStore.svelte.js';
	import { stringToColor } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';

	const { data } = $props();

	let message = $state<string>('');
	let chatBottom: HTMLDivElement;
	let currentMessage = $state<string | null>(null);

	const { loading: creatingMessage, action: sendMessage } = useLoading(async () => {
		await fetch('/api/addMessage', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ message })
		});
		message = '';
		chatBottom.scrollIntoView({ behavior: 'smooth' });
	});

	const { loading: deletingMessage, action: deleteMessage } = useLoading(async (id) => {
		await fetch('/api/deleteMessage', {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ id })
		});
	});

	$effect(() => {
		messageStore.messages = data.messages;
		chatBottom.scrollIntoView({ behavior: 'smooth' });
	});

	onDestroy(() => {
		messageStore.messages = [];
	});
</script>

{#snippet Message(message, side)}
	<div class={`flex w-full gap-2 ${side === 'left' ? 'ml-auto justify-start' : 'justify-end'}`}>
		<!-- User image -->
		<div
			class="flex flex-col bg-white border-gray-300 border rounded-xl p-3 py-2 shadow-md w-[80%]"
		>
			<div class="font-bold text-sm flex items-center justify-between gap-1">
				<div class="flex items-center gap-1">
					<img
						src={message.user.image || getUserImage(message.user.username)}
						alt="User profile"
						class="w-[25px] aspect-square rounded-full object-cover object-center"
					/>
					<p style={`color: ${stringToColor(message.user.username)}`}>{message.user.username}</p>
				</div>
				{#if message.user.$id === data.user?.$id}
					<button
						disabled={deletingMessage.value}
						onclick={() => {
							currentMessage = message.$id;
							deleteMessage(message.$id);
						}}
					>
						{#if deletingMessage.value && message.$id === currentMessage}
							<Circle size={18} color="red" />
						{:else}
							<iconify-icon
								class="text-xl text-red-500"
								icon="material-symbols-light:delete-outline"
							></iconify-icon>
						{/if}
					</button>
				{/if}
			</div>
			<p class="mt-2 text-sm text-white p-2 bg-purple-900 rounded-lg text-wrap w-full">
				{message.text}
			</p>
		</div>
	</div>
{/snippet}

<div class="w-full h-full overflow-auto relative p-2 flex flex-col gap-4">
	<div class="flex-grow flex flex-col gap-4 overflow-auto">
		{#each messageStore.messages as message}
			{@render Message(message, message.user.$id === data.user?.$id ? 'right' : 'left')}
		{:else}
			<p class="fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] text-base">Chat is empty</p>
		{/each}
		<div bind:this={chatBottom}></div>
	</div>
	<div class="flex gap-1 items-center">
		<textarea
			class="p-3 indent-1 text-sm bg-gray-200 rounded-3xl flex-grow outline-none"
			use:autoResize={{ height: 45 }}
			placeholder="Message"
			bind:value={message}
		></textarea>
		<button
			onclick={sendMessage}
			disabled={creatingMessage.value}
			class="w-[40px] aspect-square rounded-full grid place-content-center text-xl bg-purple-900 disabled:bg-gray-200 text-white self-start"
		>
			{#if creatingMessage.value}
				<Circle color="purple" size={20} />
			{:else}
				<iconify-icon icon="iconoir:send"></iconify-icon>
			{/if}
		</button>
	</div>
</div>
