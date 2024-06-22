<div class="h-full w-full flex flex-col p-2 gap-14 relative">
	<div class="rounded-lg flex flex-col gap-6">
		<div class="flex gap-10">
			<div class="aspect-square flex flex-col gap-2 items-center">
				<!-- User Image Skeleton -->
				<div
					class="w-[80px] aspect-square md:w-[100px] rounded-full bg-gray-200 animate-pulse"
				></div>
				<div class="flex flex-col justify-center">
					<!-- Username Skeleton -->
					<div class="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
				</div>
			</div>
			<div class="flex-grow flex gap-10 items-center">
				<div class="flex flex-col gap-1">
					<!-- User Rank Skeleton -->
					<div class="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
					<div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
				</div>
				<div class="flex flex-col gap-1">
					<!-- User Highest Round Skeleton -->
					<div class="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
					<div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
				</div>
			</div>
		</div>
		<!-- Start Button Skeleton -->
		<div class="h-10 bg-gray-200 rounded-sm animate-pulse"></div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex justify-between items-center">
			<!-- Top #10 and Leaderboard Skeleton -->
			<div class="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
			<div class="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
		</div>
		<!-- Table Skeleton -->
		<table class="min-w-full divide-y divide-gray-200 mt-2">
			<thead class="bg-gray-200 animate-pulse">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
					></th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
					></th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
					></th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
					></th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				<!-- Skeleton Rows -->
				{#each { length: 10 } as _}
					<tr>
						<td class="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
							<div class="h-6 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
							<div class="h-6 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
							<div class="h-6 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
							<div class="h-6 bg-gray-200 rounded animate-pulse"></div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
