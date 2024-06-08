<script lang="ts">
	import type { Difficulty, Level } from '$lib/types';
	import { levels } from '$lib/utils';
	import Play from '$lib/components/Play.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { updateUser } from '$lib/appwrite/api';
	const { data } = $props()

	let currState = $state<'levels' | 'level' | 'correct' | 'wrong' | 'timeup'>('levels');
	let currLevel = $state<Level | null>(null);
	let answer = $state<number | null>(null);
	let updatingLevel = $state<boolean>(false)

	const startLevel = (level: Level) => {
		currLevel = level;
		answer = null
		currState = 'level';
	};

	const retry = () => {
		answer = null;
		currState = 'level';
	};

	const onCorrect = async () => {
		currState = "correct"
		if(!data.user.completed_levels.includes(currLevel?.level as number)) {
			updatingLevel = true
			await updateUser(data.user.id, { completed_levels: [...data.user.completed_levels, currLevel?.level] })
			updatingLevel = false
		}
	}

	const onTimeUp = (ans: number) => {
		answer = ans
		currState = 'timeup'
	}

	const goBack = () => {
		answer = null;
		currLevel = null
		currState = 'levels';
	};

	const nextLevel = () => {
		currLevel = levels[(currLevel?.level! + 1) - 1]
		answer = null;
		currState = 'level';
	};

	$effect(() => {
		console.log('curr', currLevel?.level);
	})
</script>

<div class="p-2 relative w-full h-full flex justify-center items-center flex-col">
	{#if currState === 'levels'}
		<div class="w-full h-full flex-col">
			<p class="font-bold text-3xl self-start">Levels</p>
			<div class="grid gap-5 grid-cols-5 md:grid-cols-level-grid place-content-center mt-4">
				{#each levels as level, i}
					{@const isUnlocked =
						level.level === 1
							? true
							: data.user.completed_levels.includes(levels[i - 1].level)}
					{@const isCompleted = data.user.completed_levels.includes(level.level)}
					<button
						onclick={() => startLevel(level)}
						disabled={!isUnlocked}
						class={`aspect-square ${!isUnlocked ?? 'cursor-default'} ${isCompleted ? 'bg-purple-900' : 'bg-gray-500'} rounded-lg flex justify-center items-center p-2`}
					>
						{#if isUnlocked}
							<p class="text-2xl text-white font-bold">{level.level}</p>
						{:else}
							<iconify-icon class="text-2xl text-white" icon="streamline:padlock-square-1-solid"
							></iconify-icon>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
	{#if currState === 'level'}
		<p class="absolute left-2 top-2 text-2xl font-bold">Level: {currLevel?.level}</p>
		<Play
			difficulty={currLevel?.difficulty as Difficulty}
			onCorrect={onCorrect}
			onWrong={(correctAnswer) => {
				answer = correctAnswer;
				currState = 'wrong';
			}}
			{onTimeUp}
		/>
	{/if}
	{#if updatingLevel}
		<div class="w-full h-full grid place-content-center">
			<Circle color="purple" />
		</div>
	{:else if currState === 'correct'}
		<div class="flex flex-col gap-8">
			<p class="text-4xl text-green-500 text-center">CORRECT</p>
			<div class="flex gap-4">
				<button
					onclick={goBack}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="icon-park-solid:back"></iconify-icon> Back
				</button>
				<button
					onclick={nextLevel}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="zondicons:forward"></iconify-icon> Next level
				</button>
			</div>
		</div>
	{/if}
	{#if currState === 'wrong'}
		<div class="flex flex-col gap-8">
			<p class="text-2xl text-red-500 text-center">INCORRECT. The answer is</p>
			<div class="text-6xl text-center text-red-500">
				<p>{answer}</p>
			</div>
			<div class="flex gap-4">
				<button
					onclick={retry}
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
		<div class="flex flex-col gap-8">
			<p class="text-2xl text-red-500 text-center">Time is up. The answer is</p>
			<div class="text-6xl text-center text-red-500">
				<p>{answer}</p>
			</div>
			<div class="flex gap-4">
				<button
					onclick={retry}
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
