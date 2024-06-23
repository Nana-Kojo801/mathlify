import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent, fetch }) => {
	const { user } = await parent();
	const players = await fetch("/api/topten").then(res => res.json())
	console.log(players);
	

	const rank = await fetch(`/api/rank/${user.$id}`).then(res => res.text())

	return { players, userRank: rank, user  };
};
