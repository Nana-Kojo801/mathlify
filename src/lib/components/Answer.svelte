<script lang="ts">
	import { wait } from '$lib/utils';
	import type { FormEventHandler } from 'svelte/elements';

	const { correctAnswer, onWrong, onCorrect, onTimeUp } = $props<{
		correctAnswer: number;
		onWrong: (answer: number) => void;
		onCorrect: (answer: number) => void;
		onTimeUp: (answer: number) => void;
	}>();

	let userAnswer = $state<number>();
	let inputEl = $state<HTMLInputElement | null>(null);
	let timer = $state<number>(6);
	let stopTimer = $state<boolean>(false)

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e: Event) => {
		e.preventDefault();
		if (userAnswer === null || userAnswer === undefined) return;
		stopTimer = true
		return userAnswer === correctAnswer ? onCorrect(correctAnswer) : onWrong(correctAnswer);
	};

	const decreaseTimer = async () => {
		if (stopTimer === true) return
		if(timer <= 0) {
			return onTimeUp(correctAnswer)
		}
		timer -= 1
		await wait(1000)
		decreaseTimer()
	}

	decreaseTimer()

	$effect(() => {
		inputEl?.focus();
	});
</script>

<div class="flex flex-col gap-6 items-center justify-center w-full h-full relative">
	<p class="text-2xl tabular-nums font-bold absolute top-2 right-2">Timer: {timer}</p>
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
