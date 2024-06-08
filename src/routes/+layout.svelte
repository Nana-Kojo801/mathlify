<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	import type { SvelteComponent } from 'svelte';
	const { children } = $props<{ children: SvelteComponent; }>();
</script>

<div class="w-screen h-dvh flex flex-col overflow-auto relative">
	{@render children()}
</div>
