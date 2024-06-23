import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ fetch }) => {
    const players = await fetch("/api/getMarathonPlayers").then(res => res.json())

    return { players }
};