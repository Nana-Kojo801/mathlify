import { createSessionClient, SESSION_ID } from "$lib/appwrite/server/appwrite";

export const POST = async (event) => {
	console.log('logout');
	
	const { account } = createSessionClient(event);
	await account.deleteSession('current');
	event.cookies.delete(SESSION_ID, { path: '/' });

	return new Response("Logged out successfully")
};
