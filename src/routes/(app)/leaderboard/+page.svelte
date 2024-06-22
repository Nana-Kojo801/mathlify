<script lang="ts">
	import { getUserImage } from '$lib/appwrite/api.js';

	const { data } = $props();
</script>

<div class="w-full flex flex-col overflow-auto p-3">
	<p class="text-2xl font-bold">Leaderboard</p>
	<div class="overflow-auto">
		<table class="min-w-full divide-y divide-gray-200 mt-2">
			<thead class="border-b-1 border-b-purple-900">
				<tr>
					<th
						scope="col"
						class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
						>Rank</th
					>
					<th
						scope="col"
						class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
						>Player</th
					>
					<th
						scope="col"
						class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
						>Round</th
					>
					<th
						scope="col"
						class=" py-2 text-center md:text-base text-xs font-medium text-purple-900 uppercase tracking-wider"
						>Time</th
					>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each data.players as player, i}
					<tr>
						<td
							class=" py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 text-center"
							>{i + 1}</td
						>
						<td
							class="flex items-center justify-center gap-2 py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
						>
						<div class="w-2/4 flex gap-2 items-center">
							<img
								class="w-[30px] md:w-[40px] aspect-square rounded-full object-cover"
								src={player.image || getUserImage(player.username)}
								alt="User profile"
							/>
							{player.username}
						</div>
						</td>
						<td class=" py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
							>{player.highest_round}</td
						>
						<td class=" py-4 whitespace-nowrap md:text-sm text-xs text-gray-900 text-center"
							>{player.average_time || 0}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
