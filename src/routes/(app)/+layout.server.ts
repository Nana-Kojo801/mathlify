import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { user }, depends }) => {
    depends("appwrite:auth")
    return {
        user,
    }
}