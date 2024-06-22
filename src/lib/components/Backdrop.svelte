<script lang="ts">
	import type { SvelteComponent } from "svelte";

    const { children } = $props<{ children: SvelteComponent }>();
</script>

<div class="fixed left-0 top-0 w-screen h-dvh flex justify-center items-center p-5">
    {@render children()}
</div>