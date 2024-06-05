import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public"
import { Client, Databases, Account, Avatars } from "appwrite"

const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)

const account = new Account(client)
const databases = new Databases(client)
const avatars = new Avatars(client)

export const appwrite = { client, account, databases, avatars }

