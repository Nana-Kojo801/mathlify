<script lang="ts">
	import type { Difficulty, Level } from '$lib/types';
	import { levels } from '$lib/utils';
	import Play from '$lib/components/Play.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { authModalStore } from '$lib/stores/authModalStore.svelte';
	import { goto } from '$app/navigation';

	let currState = $state<'levels' | 'level' | 'correct' | 'wrong'>('levels');
	let currLevel = $state<Level>();
	let answer = $state<number | null>(null);

	$effect(() => {
		if (userStore.user === null) {
			goto('/');
			authModalStore.openModal = true;
		}
	});

	$effect(() => {
		if (currState === 'correct') {
			if (userStore.user?.completed_levels.includes(currLevel?.level)) return;
			userStore.updateUser({
				completed_levels: [...userStore.user?.completed_levels, currLevel?.level]
			});
		}
	});

	const startLevel = (level: Level) => {
		currLevel = level;
		currState = 'level';
	};

	const retry = () => {
		currState = 'level';
		answer = null;
	};

	const goBack = () => {
		currState = 'levels';
		answer = null;
	};

	const nextLevel = () => {
		currLevel = levels[levels.indexOf(currLevel!) + 1];
		currState = 'level';
		answer = null;
	};
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
							: userStore.user?.completed_levels.includes(levels[i - 1].level)}
					{@const isCompleted = userStore.user?.completed_levels.includes(level.level)}
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
			onCorrect={() => (currState = 'correct')}
			onWrong={(correctAnswer) => {
				answer = correctAnswer;
				currState = 'wrong';
			}}
		/>
	{/if}
	{#if userStore.loading.updatingUser}
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
</div>
