<script lang="ts">
	const { data } = $props();
</script>

<div class="w-full flex flex-col overflow-auto p-3">
	<p class="text-2xl font-bold">Leaderboard</p>
	<div class="overflow-auto">
		<table class="min-w-full divide-y divide-gray-200 mt-3">
			<thead class="bg-purple-900">
				<tr>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
						>Rank</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
						>Player</th
					>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
						>Round</th
					>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each data.players as player, i}
					<tr>
						<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.username}</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.highest_round}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
