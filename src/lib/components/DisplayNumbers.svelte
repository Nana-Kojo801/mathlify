<script lang="ts">
	import { getAnswer, wait } from "$lib/utils";

	const { numbers, interval, onDone } = $props<{
		numbers: number[];
		interval: number;
		onDone: (numbers: number) => void;
	}>();

    let currNumber = $state<number>(numbers[0]);

    const displayNumber = async (index: number) => {
        if (index > numbers.length - 1) return onDone(getAnswer(numbers))
        currNumber = numbers[index];
        await wait(interval * 1000)
        displayNumber(index + 1)
    }

    $effect(() => {
        displayNumber(0)
    })

</script>

<p class="text-6xl text-purple-900 font-bold">{currNumber}</p>