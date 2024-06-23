import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID } from '$env/static/public'
import { createSessionClient } from '$lib/appwrite/server/appwrite.js'
import { json } from '@sveltejs/kit'

export const GET = async (event) => {
    const {databases} = createSessionClient(event)

    const results = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID
    )
    return json(results.documents)
}