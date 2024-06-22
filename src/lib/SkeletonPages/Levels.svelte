<div class="w-full h-full flex-col">
    <!-- Title Skeleton -->
    <div class="h-8 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>
    <div class="grid gap-5 grid-cols-5 md:grid-cols-level-grid place-content-center mt-4">
        <!-- Skeleton Buttons -->
        {#each Array(500) as _}
            <div class="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        {/each}
    </div>
</div>
