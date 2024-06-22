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
        {#each { length: 20 } as _}
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