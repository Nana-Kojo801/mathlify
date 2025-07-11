import { mutation, query } from '@convex/_generated/server'
import {
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions'

export const authQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw Error('User is not authenticated')

    const dbUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', user.email!))
      .unique()

    return { user: dbUser! }
  }),
)

export const authMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw Error('User is not authenticated')

    const dbUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', user.email!))
      .unique()

    return { user: dbUser! }
  }),
)
