import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { user }, depends, fetch }) => {
    depends("appwrite:auth")
    let offline = null
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        if (!res.ok) throw Error("No internet")
        offline = false
    } catch {
        offline = true
    }
    return {
        user,
        offline
    }
}