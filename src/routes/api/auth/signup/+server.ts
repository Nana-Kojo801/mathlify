import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public'
import { createAdminClient, SESSION_ID } from '$lib/appwrite/server/appwrite.js'
import { ID } from "node-appwrite"

export const POST = async ({ request, cookies }) => {
    const {account, databases} = createAdminClient()
    const { username, email, password } = await request.json()

    await account.create(ID.unique(), email, password, username)
    await databases.createDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        { username, email, password }
    )
    const session = await account.createEmailPasswordSession(email, password)
    cookies.set(SESSION_ID, session.secret, {
        path: '/',
        expires: new Date(session.expire),
        sameSite: 'strict',
    });

    return new Response("Successfully created user")
}