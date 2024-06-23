{#snippet Message(side)}
	<div class={`flex w-full gap-2 ${side === 'left' ? 'ml-auto justify-start' : 'justify-end'}`}>
		<div
			class="flex flex-col bg-white border-gray-300 border rounded-xl p-3 py-2 shadow-md w-[80%] animate-pulse"
		>
			<div class="font-bold text-sm flex items-center gap-1">
				<div class="w-[25px] h-[25px] rounded-full bg-gray-300"></div>
				<div class="h-4 bg-gray-300 rounded w-1/2"></div>
			</div>
			<div class="mt-2 text-sm bg-gray-300 rounded-lg h-6 w-full"></div>
		</div>
	</div>
{/snippet}
<div class="w-full h-full overflow-auto relative p-2 flex flex-col gap-4">
	<p class="text-xl font-bold">Public Chat</p>
	<div class="flex-grow flex flex-col gap-4 overflow-auto">
		{#each Array(10) as _, i}
			{@render Message(i % 2 === 0 ? 'left' : 'right')}
		{/each}
		<div></div>
	</div>
	<div class="flex gap-1 items-center">
		<input
			class="p-3 indent-1 text-sm bg-gray-200 rounded-3xl flex-grow outline-none"
			placeholder="Message"
		/>
		<button
			class="w-[40px] aspect-square rounded-full grid place-content-center text-xl bg-purple-900 disabled:bg-gray-200 text-white self-start"
		>
			<iconify-icon icon="iconoir:send"></iconify-icon>
		</button>
	</div>
</div>
