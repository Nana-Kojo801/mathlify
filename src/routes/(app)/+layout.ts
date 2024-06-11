import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ depends, data: { user }, fetch }) => {
    depends("appwrite:auth")
    let offline = null
    try {
        const res = await fetch("http://httpbin.org/get")
        if (!res.ok) throw Error("No internet")
        offline = false
    } catch {
        offline = true
    }
    return {
        user,
        offline
    }
};