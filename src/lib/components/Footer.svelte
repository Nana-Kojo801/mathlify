<script lang="ts">
	import { onlineStore } from '$lib/stores/onlineStore.svelte';
	import Header from './Header.svelte';

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
			name: 'Profile',
			href: '/profile',
			icon: 'bxs:user'
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
		},
	];
	const offlineLinks = ["/home", "/practice"];
	let navLinks = $state([]) as { href: string, icon: string, name: string }[];
	$effect(() => {
		navLinks = onlineStore.online ? onlineLinks : onlineLinks.filter(l => offlineLinks.includes(l.name));
	});
</script>

<footer class="flex justify-evenly gap-2 items-center p-2 bg-white">
	{#each navLinks as links}
		<a class="flex flex-col items-center" href={links.href}>
			<iconify-icon class="text-purple-900 text-2xl" icon={links.icon}></iconify-icon>
			<p class="text-[10px] md:text-xs text-purple-900">{links.name}</p>
		</a>
	{/each}
</footer>
