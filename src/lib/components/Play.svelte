<script lang="ts">
	import type { Difficulty } from '$lib/types';
	import { getRandomNumbers } from '$lib/utils';
	import Answer from './Answer.svelte';
	import CountDown from './CountDown.svelte';
	import DisplayNumbers from './DisplayNumbers.svelte';

	const { difficulty, onCorrect, onWrong, onTimeUp } = $props<{
		difficulty: Difficulty;
		onCorrect: (answer: number) => void;
		onWrong: (answer: number) => void;
		onTimeUp: (answer: number) => void
	}>();

	let currState = $state<'idle' | 'countdown' | 'questioning' | 'answer'>(
		'idle'
	);

	let answer = $state<number | null>(null);

</script>

<div class="w-full h-full flex justify-center items-center relative">
	{#if currState === 'idle'}
		<button onclick={() => (currState = 'countdown')} class="primary-btn p-3 text-xl w-[150px]"
			>Start</button
		>
	{/if}
	{#if currState === 'countdown'}
		<CountDown onDone={() => (currState = 'questioning')} />
	{/if}
	{#if currState === 'questioning'}
		<DisplayNumbers
			interval={difficulty.interval}
			numbers={getRandomNumbers(difficulty)}
			onDone={(ans) => {
                answer = ans
                currState = 'answer'
            }}
		/>
	{/if}
    {#if currState === 'answer'}
        <Answer timer={difficulty.timer} onTimeUp={onTimeUp} correctAnswer={answer as number} onWrong={onWrong} onCorrect={onCorrect} />
    {/if}
</div>
