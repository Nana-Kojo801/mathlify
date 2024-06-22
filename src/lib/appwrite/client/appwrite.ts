import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public"
import { Client, Databases, Account, Avatars, Storage } from "appwrite"

const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)

const account = new Account(client)
const databases = new Databases(client)
const avatars = new Avatars(client)
const storage = new Storage(client)

export const appwrite = { client, account, databases, avatars, storage }

