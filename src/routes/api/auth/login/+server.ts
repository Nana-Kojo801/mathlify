import { createAdminClient, SESSION_ID } from '$lib/appwrite/server/appwrite.js'

export const POST = async ({ request, cookies }) => {
    const {account} = createAdminClient()
    const { email, password } = await request.json()

    const session = await account.createEmailPasswordSession(email, password)
    cookies.set(SESSION_ID, session.secret, {
        path: '/',
        expires: new Date(session.expire),
        sameSite: 'strict',
    });
    return new Response("Successfully logged in")
}