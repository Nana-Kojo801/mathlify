<script lang="ts">
	import Play from '$lib/components/Play.svelte';
	import { getDifficulty } from '$lib/utils';
	import { getUserImage, updateUser } from '$lib/appwrite/api';
	import { Circle } from 'svelte-loading-spinners';
	const { data } = $props();

	let round = $state<number>(1);
	let answer = $state<number | null>(null);
	let currState = $state<'idle' | 'playing' | 'correct' | 'wrong' | 'updatingRound'>('idle');
	let updatingRound = $state<boolean>(false);

	const onCorrect = async () => {
		currState = 'correct';
		if (round > data.user.highest_round) {
			updatingRound = true;
			await updateUser(data.user.id, { highest_round: round });
			updatingRound = false;
		}
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
		round = 1;
		answer = null;
		currState = 'idle';
	};

	const startOver = () => {
		round = 1;
		answer = null;
		currState = 'playing';
	};
</script>

<div class="h-full flex flex-col p-2 gap-14 overflow-auto relative">
	{#if currState === 'idle'}
		<div class="rounded-lg flex flex-col gap-6">
			<div class="flex gap-10">
				<div class="aspect-square flex flex-col gap-2 items-center">
					<img
						class="w-[80px] md:w-[100px] rounded-full"
						src={getUserImage(data.user.username) as unknown as string}
						alt="User profile"
					/>
					<div class="flex flex-col justify-center">
						<p class="font-bold text-xl">{data.user.username}</p>
					</div>
				</div>
				<div class="flex-grow flex gap-10 items-center">
					<div class="flex flex-col gap-1">
						<p class="font-bold text-xl text-center">{data.userRank}</p>
						<p class="text-center">Rank</p>
					</div>
					<div class="flex flex-col gap-1">
						<p class="font-bold text-xl text-center">{data.user.highest_round}</p>
						<p class="text-center">Round</p>
					</div>
				</div>
			</div>
			<button
				onclick={() => (currState = 'playing')}
				class="p-3 w-full text-sm text-white bg-purple-900 rounded-sm">Start marathon</button
			>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex justify-between items-center">
				<p class="text-xl font-bold">Top #10</p>
				<a
					class="p-2 text-md text-purple-900 rounded-md flex items-center gap-2"
					href="/leaderboard"
					><iconify-icon icon="ic:round-leaderboard" class="text-purple-900"
					></iconify-icon>Leaderboard</a
				>
			</div>
			<table class="min-w-full divide-y divide-gray-200 mt-3">
				<thead class="bg-purple-900">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
							>Rank</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
							>Player</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
							>Round</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.players as player, i}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.username}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
								>{player.highest_round}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if currState === 'playing'}
		<p class="absolute left-2 top-2 text-2xl font-bold">Round: {round}</p>
		<Play difficulty={getDifficulty(round)} {onCorrect} {onWrong} />
	{/if}
	{#if updatingRound}
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
