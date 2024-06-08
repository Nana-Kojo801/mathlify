import { createSessionClient, SESSION_ID } from "$lib/appwrite/server/appwrite";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
    logout: async (event) => {
        try {
            const {account} = createSessionClient(event)
            await account.deleteSession("current")
            event.cookies.delete(SESSION_ID, { path: "/" });
            // invalidate("appwrite:auth")
            redirect(301, "/")
        } catch(err) {
            console.log('logout err', (err as Error).message);
        }
    }
};