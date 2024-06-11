<script lang="ts">
	import { difficulties, difficultyList } from '$lib/utils';
	import { type Difficulty } from '$lib/types';
	import Play from '$lib/components/Play.svelte';

	let currDifficulty = $state<Difficulty>(difficulties[0]);

	let currState = $state<'settings' | 'playing' | 'correct' | 'wrong' | 'timeup'>('settings');
	let answer = $state<number | null>(null);

	const playAgain = () => (currState = 'playing');
	const goBack = () => (currState = 'settings');
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if currState === 'settings'}
		<div class="p-2 w-full h-full flex flex-col relative">
			<p class="text-2xl font-bold">Practice</p>
			<div class="flex flex-col gap-10">
				<div class="mt-8">
					<p class="text-purple-900 text-xl font-bold">Difficulty</p>
					<div class="grid grid-cols-3 md:grid-cols-difficulty-grid gap-3 mt-4">
						{#each difficulties as difficulty}
							<button
								onclick={() => (currDifficulty = difficulty)}
								class={`p-2 text-[12px] ${currDifficulty.difficulty === difficulty.difficulty ? 'bg-purple-900 text-white' : 'text-purple-900'} lg:text-sm shadow-base rounded-sm`}
							>
								{difficulty.difficulty}
							</button>
						{/each}
					</div>
				</div>
				{#if currDifficulty.difficulty === 'Custom'}
					<div>
						<p class="text-purple-900 text-xl font-bold">Time interval(seconds)</p>
						<div class="flex gap-2 items-center mt-2">
							<input
								class="border-b-2 border-purple-900 p-2 w-full text-base outline-none"
								type="number"
								bind:value={currDifficulty.interval}
							/>
						</div>
					</div>
					<div class="">
						<p class="text-purple-900 text-xl font-bold">Range</p>
						<div class="flex flex-col mt-2">
							<label class="text-base" for="from"> From </label>
							<input
								type="number"
								id="from"
								class="border-b-2 flex-grow border-purple-900 outline-none py-1"
								bind:value={currDifficulty.range.from}
							/>
						</div>
						<div class="flex flex-col mt-8">
							<label class="text-base" for="to"> To </label>
							<input
								id="to"
								type="number"
								class="border-b-2 flex-grow border-purple-900 outline-none py-1"
								bind:value={currDifficulty.range.to}
							/>
						</div>
					</div>
					<div class="">
						<p class="text-purple-900 text-xl font-bold">Quantity</p>
						<div class="flex flex-col mt-2">
							<label class="text-base" for="from"> Minimum quantity </label>
							<input
								type="number"
								id="min"
								class="border-b-2 flex-grow border-purple-900 outline-none py-1"
								bind:value={currDifficulty.quantity.min}
							/>
						</div>
						<div class="flex flex-col mt-8">
							<label class="text-base" for="to"> Maximum quantity </label>
							<input
								id="max"
								type="number"
								class="border-b-2 flex-grow border-purple-900 outline-none py-1"
								bind:value={currDifficulty.quantity.max}
							/>
						</div>
					</div>
				{/if}
			</div>
			<button
				onclick={() => (currState = 'playing')}
				class="primary-btn lg:text-base lg:p-3 mt-8 w-full">Practice</button
			>
		</div>
	{/if}
	{#if currState === 'playing'}
		<Play
			difficulty={currDifficulty}
			onCorrect={() => (currState = 'correct')}
			onWrong={(correctAnswer) => {
				answer = correctAnswer;
				currState = 'wrong';
			}}
			onTimeUp={(correctAnswer) => {
				answer = correctAnswer
				currState = 'timeup'
			}}
		/>
	{/if}
	{#if currState === 'correct'}
		<div class="flex flex-col gap-8">
			<p class="text-4xl text-green-500 text-center">CORRECT</p>
			<div class="flex gap-4">
				<button
					onclick={playAgain}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="circum:redo"></iconify-icon> Play again
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
	{#if currState === 'wrong'}
		<div class="flex flex-col gap-8">
			<div class="text-6xl text-center text-red-500">
				<p class="text-2xl text-red-500 text-center">INCORRECT. The answer is</p>
				<p>{answer}</p>
			</div>
			<div class="flex gap-4">
				<button
					onclick={playAgain}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="circum:redo"></iconify-icon> Play again
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
					onclick={playAgain}
					class="primary-btn flex gap-3 px-3 w-[150px] items-center justify-center"
				>
					<iconify-icon class="text-white" icon="circum:redo"></iconify-icon> Play again
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
