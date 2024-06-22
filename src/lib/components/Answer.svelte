<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import Timer from './Timer.svelte';

	const { correctAnswer, onWrong, onCorrect, onTimeUp, timer, showTime } = $props<{
		correctAnswer: number;
		onWrong: (answer: number) => void;
		onCorrect: ({ answer, time }: { answer: number; time: number }) => void;
		onTimeUp: (answer: number) => void;
		timer: number;
		showTime: boolean;
	}>();

	let userAnswer = $state<number>();
	let inputEl = $state<HTMLInputElement | null>(null);
	let timerValue = $state<number>(timer + 1);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e: Event) => {
		e.preventDefault();
		console.log('timer', timerValue);
		
		if (userAnswer === null || userAnswer === undefined) return;
		return userAnswer === correctAnswer
			? onCorrect({ answer: correctAnswer, time: timerValue })
			: onWrong(correctAnswer);
	};

	const trackTime = (time: number) => {
		timerValue = time;
	};

	$effect(() => {
		inputEl?.focus();
	});
</script>

<div class="flex flex-col gap-6 items-center justify-center w-full h-full relative">
	{#if showTime}
		<Timer track={trackTime} onDone={() => onTimeUp(correctAnswer)} startSeconds={timer} />
	{/if}
	<p class="text-2xl">The answer is</p>
	<form onsubmit={handleSubmit} class="flex flex-col gap-6">
		<input
			type="number"
			bind:this={inputEl}
			bind:value={userAnswer}
			class="text-6xl w-[150px] border-b-2 border-purple-900 text-center outline-none text-purple-900 p-3"
		/>
		<button class="primary-btn w-full">Submit</button>
	</form>
</div>
