import { getAuthUserId } from '@convex-dev/auth/server'
import { mutation, query } from '@convex/_generated/server'
import {
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions'

export const authQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const id = await getAuthUserId({ auth: ctx.auth })
    if (!id) throw Error('User is not authenticated')

    const dbUser = await ctx.db.get(id)

    return { user: dbUser! }
  }),
)

export const authMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const id = await getAuthUserId({ auth: ctx.auth })
    if (!id) throw Error('User is not authenticated')

    const dbUser = await ctx.db.get(id)

    return { user: dbUser! }
  }),
)
