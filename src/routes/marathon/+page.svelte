<script lang="ts">
	import { userStore, getTopTen } from '$lib/stores/userStore.svelte';
	import Play from '$lib/components/Play.svelte';
	import { getDifficulty } from '$lib/utils';
	import { Circle } from 'svelte-loading-spinners';
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import { goto } from "$app/navigation"

	let round = $state<number>(1);
	let answer = $state<number | null>(null);
	let currState = $state<'idle' | 'playing' | 'correct' | 'wrong' | 'updatingRound'>('idle');

	$effect(() => {
		if (userStore.user === null) {
			goto("/")
			authModalStore.openModal = true
		}
	})

	$effect(() => {
		if (currState === 'correct') {
			if (round > userStore.user?.highest_round) {
				userStore.updateUser({ highest_round: round });
			}
		}
	});

	const onCorrect = () => {
		currState = 'correct';
	};

	const onWrong = (ans: number) => {
		answer = ans;
		currState = 'wrong';
	};

	const nextRound = () => {
		round = round + 1;
		answer = null;
		currState = 'playing';
	};

	const goBack = () => {
		answer = null;
		currState = 'idle';
	};

	const startOver = () => {
		round = 1;
		answer = null;
		currState = 'playing';
	};
</script>

{#snippet Player(player)}
	<div class="p-1 rounded-lg aspect-[1/1.4] flex flex-col justify-center items-center gap-4">
		<div class="w-[80%] aspect-square rounded-full">
			<img
				class="rounded-full"
				src={userStore.getUserImage(player.username) as unknown as string}
				alt="User profile"
			/>
		</div>
		<p class="text-center text-base">{player.username}</p>
	</div>
{/snippet}
{#snippet LoadingPlayer()}
	<div class="animate-pulse bg-gray-100 p-4 rounded-lg aspect-[1/1.4] flex flex-col justify-center items-center gap-4">
		<div class="w-full aspect-square rounded-full animate-pulse">
			
		</div>
		<p class="text-center text-base animate-pulse"></p>
	</div>
{/snippet}
<div class="h-full flex flex-col p-2 gap-10 overflow-auto relative">
	{#if currState === 'idle'}
		<div>
			<p class="text-2xl font-bold">Top #10</p>
			<div
				class="grid grid-flow-col grid-cols-top-players-grid lg:grid-cols-large-top-players-grid gap-8 overflow-auto p-1 mt-4"
			>
				{#await getTopTen()}
          {#each { length: 10 } as _}
            {@render LoadingPlayer()}
          {/each}
        {:then players} 
          {#each players as player, i}
            {@render Player(player)}
          {/each}
        {/await}
			</div>
		</div>
		<div>
			<p class="text-xl lg:text-2xl font-bold">
				Me ({userStore.user?.username})
			</p>
			<div class="flex flex-col gap-2 mt-2">
				<p class="border-b-2 py-2">Rank: {userStore.user?.rank}</p>
				<p class="border-b-2 py-2">
					Highest round: {userStore.user?.highest_round}
				</p>
			</div>
		</div>
		<button
			onclick={() => (currState = 'playing')}
			class="primary-btn w-full p-2.5 lg:p-3 text-sm lg:text-base mt-8"
		>
			Start Marathon
		</button>
	{/if}
	{#if currState === 'playing'}
		<p class="absolute left-2 top-2 text-2xl font-bold">Round: {round}</p>
		<Play difficulty={getDifficulty(round)} {onCorrect} {onWrong} />
	{/if}
	{#if userStore.loading.updatingUser}
		<div class="w-full h-full grid place-content-center">
			<Circle color="purple" />
		</div>
	{:else if currState === 'correct'}
		<div class="flex flex-col gap-8 w-full h-full justify-center items-center">
			<p class="text-4xl text-green-500 text-center">CORRECT</p>
			<div class="flex gap-4">
				<button
					onclick={goBack}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="icon-park-solid:back"></iconify-icon> Back
				</button>
				<button
					onclick={nextRound}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="zondicons:forward"></iconify-icon> Next round
				</button>
			</div>
		</div>
	{/if}
	{#if currState === 'wrong'}
		<div class="flex flex-col gap-8 w-full h-full justify-center items-center">
			<p class="text-2xl text-red-500 text-center">INCORRECT. The answer is</p>
			<div class="text-6xl text-center text-red-500">
				<p>{answer}</p>
			</div>
			<p class="text-xl font-bold text-center mt-2">Your round: {round}</p>
			<div class="flex gap-4">
				<button
					onclick={startOver}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="circum:redo"></iconify-icon> Retry
				</button>
				<button
					onclick={goBack}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="icon-park-solid:back"></iconify-icon> Back
				</button>
			</div>
		</div>
	{/if}
</div>
