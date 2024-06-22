<script lang="ts">
	import { untrack } from 'svelte';

	const { startSeconds, onDone, track } = $props<{
		startSeconds: number;
		onDone: (time: number) => void;
		track?: (time: number) => void;
	}>();

	let elapsedTime = $state((startSeconds + 1) * 1000);

	let interval: NodeJS.Timeout;

	$effect(() => {
		interval = setInterval(() => {
			const newValue = elapsedTime - 10;
			if (newValue <= 0) {
				clearInterval(interval);
				onDone(0);
			} else {
				elapsedTime = newValue;
			}
		}, 10);

		untrack(() => elapsedTime);

		return () => {
			clearInterval(interval);
		};
	});

	$effect(() => {
		track(elapsedTime / 1000);
	});
</script>

<p class="text-2xl tabular-nums font-bold absolute top-2 right-2"><span class="tabular-nums">{elapsedTime / 1000}</span></p>
