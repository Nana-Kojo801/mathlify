import { APPWRITE_KEY } from "$env/static/private"
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public"
import type { RequestEvent } from "@sveltejs/kit"
import { Client, Account, Databases, ID, Storage } from "node-appwrite"

export const createSessionClient = (event: RequestEvent) => {
    const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)

    const session = event.cookies.get("session")
    if (!session) {
        throw Error("No session found")
    }
    client.setSession(session)

    return {
        get account() { return new Account(client) },
        get databases() { return new Databases(client)},
        get storage() { return new Storage(client) }
    }
}

export const createAdminClient = () => {
    const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY)

    return {
        get account() { return new Account(client) },
        get databases() { return new Databases(client)},
        get storage() { return new Storage(client) }
    }
}

export { ID }
export const SESSION_ID = "session"