<script lang="ts">
	import Play from '$lib/components/Play.svelte';
	import { getDifficulty } from '$lib/utils';
	import { getUserImage } from '$lib/appwrite/api';
	import { Circle } from 'svelte-loading-spinners';
	import { invalidate } from '$app/navigation';
	const { data } = $props();

	let round = $state<number>(1);
	let answer = $state<number | null>(null);
	let currState = $state<
		| 'idle'
		| 'playing'
		| 'correct'
		| 'wrong'
		| 'updatingRound'
		| 'updatingTime'
		| 'timeup'
		| 'pending'
	>('idle');
	let different_times = $state<number[]>([]);
	let average_time = $derived.by(() => {
		return (
			different_times.reduce((prev, curr) => prev + curr, 0) / (round === 1 ? round : round - 1)
		);
	});
	let pending_actions = [] as (() => Promise<void>)[];

	const checkNewTime = () => {
		if (data.user?.average_time === 0 || null || average_time < data.user?.average_time) {
			pending_actions.push(async () => {
				await fetch(`/api/user/${data.user.$id}`, {
					method: 'PUT',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({ average_time: average_time })
				});
				await invalidate('appwrite:auth');
			});
		}
	};

	const checkNewRound = () => {
		if (round > data.user?.highest_round!) {
			pending_actions.push(async () => {
				await fetch(`/api/user/${data.user.$id}`, {
					method: 'PUT',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({ highest_round: round })
				});
				await invalidate('appwrite:auth');
			});
		}
	};

	const onCorrect = async ({ time }: { time: number }) => {
		different_times.push(parseFloat((getDifficulty(round).timer + 1 - time).toFixed(2)));
		checkNewTime();
		checkNewRound();
		currState = 'correct';
	};

	const onWrong = async (ans: number) => {
		checkNewTime();
		answer = ans;
		currState = 'wrong';
	};

	const execute_action = async () => {
		currState = 'pending';
		await Promise.all(pending_actions);
		pending_actions = [];
	};

	const nextRound = async () => {
		if (pending_actions.length !== 0) await execute_action();
		round = round + 1;
		answer = null;
		currState = 'playing';
	};

	const goBack = async () => {
		if (pending_actions.length !== 0) await execute_action();
		round = 1;
		answer = null;
		currState = 'idle';
	};

	const startOver = async () => {
		if (pending_actions.length !== 0) await execute_action();
		round = 1;
		answer = null;
		currState = 'playing';
	};

	const onTimeUp = async (ans: number) => {
		if (pending_actions.length !== 0) await execute_action();
		answer = ans;
		currState = 'timeup';
	};
</script>

<div class="h-full w-full flex flex-col p-2 gap-14 relative">
	{#if currState === 'idle'}
		<div class="rounded-lg flex flex-col gap-6">
			<div class="flex gap-10">
				<div class="aspect-square flex flex-col gap-2 items-center">
					<img
						class="w-[80px] aspect-square md:w-[100px] rounded-full object-cover"
						src={data.user?.image}
						alt="User profile"
					/>
					<div class="flex flex-col justify-center">
						<p class="font-bold text-xl">{data.user?.username}</p>
					</div>
				</div>
				<div class="flex-grow flex gap-10 items-center">
					<div class="flex flex-col gap-1">
						<p class="font-bold text-xl text-center">{data.userRank}</p>
						<p class="text-center">Rank</p>
					</div>
					<div class="flex flex-col gap-1">
						<p class="font-bold text-xl text-center">{data.user?.highest_round}</p>
						<p class="text-center">Round</p>
					</div>
				</div>
			</div>
			<button
				onclick={() => (currState = 'playing')}
				class="p-3 w-full text-sm text-white bg-purple-900 rounded-md">Start marathon</button
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
			<table class="min-w-full divide-y divide-gray-200 mt-2">
				<thead class="border-b-1 border-b-purple-900">
					<tr>
						<th
							scope="col"
							class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
							>Rank</th
						>
						<th
							scope="col"
							class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
							>Player</th
						>
						<th
							scope="col"
							class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
							>Round</th
						>
						<th
							scope="col"
							class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
							>Time</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.players as player, i}
						<tr>
							<td
								class="py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 text-center"
								>{i + 1}</td
							>
							<td
								class="flex items-center justify-center gap-2 py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
							>
							<div class="w-2/4 flex gap-2 items-center">
								<img
									class="w-[20px] md:w-[40px] aspect-square rounded-full object-cover"
									src={player.image || getUserImage(player.username)}
									alt="User profile"
								/>
								{player.username}
							</div>
							</td>
							<td class=" py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
								>{player.highest_round}</td
							>
							<td class=" py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
								>{player.average_time || 0}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if currState === 'playing'}
		<p class="absolute left-2 top-2 text-2xl font-bold">Round: {round}</p>
		<Play {onTimeUp} difficulty={getDifficulty(round)} {onCorrect} {onWrong} />
	{/if}
	{#if currState === 'updatingRound' || currState === 'updatingTime' || currState === 'pending'}
		<div class="w-full h-full grid place-content-center">
			<Circle color="purple" />
		</div>
	{/if}
	{#if currState === 'correct'}
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
	{#if currState === 'timeup'}
		<div class="flex flex-col gap-8 w-full h-full justify-center items-center">
			<p class="text-2xl text-red-500 text-center">Time is up. The answer is</p>
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
