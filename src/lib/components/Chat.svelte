<script>
	import autoResize from '$lib/actions/AutoResize';
</script>

{#snippet Message(type)}
	<div
		class={`flex min-w-[70%] w-max flex-col ${type === 'Left' ? 'self-start' : 'self-end'} px-3 py-2 rounded-lg bg-gray-100`}
	>
		<p class="text-sm text-orange-500">Nana Kojo</p>
		<p class="py-2">Will you play?</p>
	</div>
{/snippet}

<div class="w-full h-full flex flex-col relative overflow-auto">
	<div class="flex-grow flex flex-col overflow-auto p-2 gap-5">
		{@render Message('Left')}
		{@render Message('Right')}
		{@render Message('Left')}
		{@render Message('Right')}
		{@render Message('Left')}
		{@render Message('Right')}
		{@render Message('Left')}
		{@render Message('Left')}
		{@render Message('Right')}
		{@render Message('Left')}
		{@render Message('Left')}
		{@render Message('Left')}
		{@render Message('Right')}
		{@render Message('Right')}
		{@render Message('Left')}
		{@render Message('Left')}
		{@render Message('Left')}
	</div>
	<form class="flex">
		<textarea
			use:autoResize={{ height: 45 }}
			class="text-base box-border p-2 flex-grow outline-none border-2 border-purple-900"
			placeholder="Message"
		></textarea>
		<button class="primary-btn rounded-none text-sm w-[80px] max-h-[45px]">Send</button>
	</form>
</div>
