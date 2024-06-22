import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ parent }) => {
    const { user } = await parent()

    return { user }
}