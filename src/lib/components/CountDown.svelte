<script lang="ts">
	import { browser } from '$app/environment';
	import { wait } from '$lib/utils';

	const { onDone } = $props<{ onDone: () => void }>();

	const stages = ['3', '2', '1', 'GO!!!'];
	let stage = $state<string | null>(null);
	let pEl = $state<HTMLParagraphElement | null>(null);

	const countdown = async (index = 0 as number) => {
		if (index > stages.length - 1) return onDone();
		stage = stages[index];
		await wait(1000);
		countdown(index + 1);
	};

	$effect(() => {
		countdown();
	});

	$inspect(stage).with((type) => {
		if (type === 'update') {
			if (!browser) return;

			pEl?.animate([{ scale: '1' }, { scale: '2' }, { scale: '1' }], { duration: 1000 });
		}
	});
</script>

<div>
	<p class="text-4xl text-purple-900 font-bold" bind:this={pEl}>{stage}</p>
</div>
