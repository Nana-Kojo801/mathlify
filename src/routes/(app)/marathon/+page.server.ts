import { redirect, type ServerLoad } from '@sveltejs/kit';
import { createAdminClient } from '$lib/appwrite/server/appwrite';
import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public';
import { Query } from 'node-appwrite';

export const load: ServerLoad = async ({ locals: { user, online }, depends }) => {
	depends("appwrite:auth")
	if (online === false) redirect(302, "/")
	if (!user) redirect(302, '/login');
    const {databases} = createAdminClient()

	const result =await  databases.listDocuments(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		[Query.orderDesc('highest_round'), Query.notEqual('highest_round', 0), Query.limit(10)]
	);

    const rank = result.documents.findIndex((d, i) => d.$id === user.id) + 1

	return { user, players: result.documents, userRank: rank };
};
