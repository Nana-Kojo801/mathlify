<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

    const { correctAnswer, onWrong, onCorrect } = $props<{
        correctAnswer: number;
        onWrong: (answer: number) => void;
        onCorrect: () => void;
    }>();
    
    let userAnswer = $state<number>()
    let inputEl = $state<HTMLInputElement | null>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e: Event) => {
        e.preventDefault();
        if (userAnswer === null || userAnswer === undefined) return
        return userAnswer === correctAnswer ? onCorrect() : onWrong(correctAnswer);
    }

    $effect(() => {
        inputEl?.focus()
    })
</script>

<div class="flex flex-col gap-6 items-center">
    <p class="text-2xl">The answer is </p>
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