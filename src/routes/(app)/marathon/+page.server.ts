import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent, fetch }) => {
	const { user } = await parent();
	const playersRes = await fetch("/api/topten")
	const players = playersRes.json()

	const rankRes = await fetch(`/api/rank/${user.$id}`)
	const rank = +(await rankRes.text())

	return { players, userRank: rank, user  };
};
