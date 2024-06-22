import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public'
import { createSessionClient } from '$lib/appwrite/server/appwrite'
import type { User } from '$lib/types'
import { user_props } from '$lib/utils'
import { Query } from 'node-appwrite'

export const handle = async ({ event, resolve }) => {
  try {
    console.log('lodading user');
    
    const {account, databases} = createSessionClient(event)
    const currentAccount = await account.get()
    const results = await databases.listDocuments(
      PUBLIC_APPWRITE_DATABASE_ID,
      PUBLIC_APPWRITE_USERS_COLLECTION_ID,
      [Query.equal("email", currentAccount.email), Query.select(user_props)]
    )
    console.log('done loading user...');
    const user = {...results.documents[0], image: results.documents[0].image === null ? `${PUBLIC_APPWRITE_ENDPOINT}/avatars/initials?name=${results.documents[0].username}`: results.documents[0].image}
    event.locals.user = user as unknown as User
    // console.log(event.locals.user);
    
    
  } catch {
    event.locals.user = null
  }

  return resolve(event)
}