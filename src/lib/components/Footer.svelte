<script lang="ts">
	import { onlineStore } from '$lib/stores/onlineStore.svelte';

	const onlineLinks = [
		{
			name: 'Home',
			href: '/',
			icon: 'ph:house-fill'
		},
		{
			name: 'Marathon',
			href: '/marathon',
			icon: 'cil:running'
		},
		{
			name: 'Levels',
			href: '/levels',
			icon: 'icon-park-solid:game-ps'
		},
		{
			name: 'Practice',
			href: '/practice',
			icon: 'ic:round-model-training'
		}
	];
	const offlineLinks = [
		{
			name: 'Home',
			href: '/',
			icon: 'ph:house-fill'
		},
		{
			name: 'Practice',
			href: '/practice',
			icon: 'ic:round-model-training'
		}
	];
	let navLinks = $state([]) as { href: string, icon: string, name: string }[];
	$effect(() => {
		navLinks = onlineStore.online ? onlineLinks : offlineLinks;
	});
</script>

<footer class="flex justify-evenly items-center p-2 bg-white">
	{#each navLinks as links}
		<a class="flex flex-col items-center" href={links.href}>
			<iconify-icon class="text-purple-900 text-xl" icon={links.icon}></iconify-icon>
			<p class="text-sm text-purple-900">{links.name}</p>
		</a>
	{/each}
</footer>
