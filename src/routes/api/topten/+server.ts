import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public'
import { createSessionClient } from '$lib/appwrite/server/appwrite.js'
import { user_props } from '$lib/utils'
import { json } from '@sveltejs/kit'
import { Query } from 'node-appwrite'

export const GET = async (event) => {
    const {databases} = createSessionClient(event)
    const results = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.limit(10), Query.select(user_props), Query.orderDesc("highest_round"), Query.orderAsc("average_time"), Query.notEqual("highest_round", 0)]
    )

    return json(results.documents)
}