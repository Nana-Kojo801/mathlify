import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { user, online }, depends }) => {
    depends("appwrite:auth")
    return {
        user,
        online
    }
}