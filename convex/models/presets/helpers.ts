import type { MutationCtx, QueryCtx } from '@convex/_generated/server'
import type { Preset, PresetSettings, User } from '@convex/shared/types'

export const getUserPresets = async (ctx: QueryCtx, userId: User['_id']) => {
  return await ctx.db
    .query('presets')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .collect()
}

export const createUserPreset = async (
  ctx: MutationCtx,
  userId: User['_id'],
  type: 'flow' | 'rapid',
  name: Preset['name'],
  settings: PresetSettings,
) => {
  await ctx.db.insert('presets', { settings, name, type, userId })
}
