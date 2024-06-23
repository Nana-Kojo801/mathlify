import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public'
import { createSessionClient } from '$lib/appwrite/server/appwrite.js'
import { json } from '@sveltejs/kit'
import { Query } from 'node-appwrite'

export const GET = async (event) => {
    const {databases} = createSessionClient(event)
    const results = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0)]
    )

    const users = results.documents.sort((a, b) => {
        if (a.highest_round === b.highest_round) {
            return b.average_time - a.average_time
        }
        return 0
    })

    return json(users)
}