import { createSessionClient, SESSION_ID } from "$lib/appwrite/server/appwrite";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	logout: async (event) => {
		console.log('logout');
		const { account } = createSessionClient(event);
		await account.deleteSession('current');
		event.cookies.delete(SESSION_ID, { path: '/' });
		// invalidate("appwrite:auth")
		throw redirect(302, '/');
	}
};