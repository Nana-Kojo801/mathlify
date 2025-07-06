import type { MutationCtx, QueryCtx } from '@convex/_generated/server'
import type { Competition, User } from '@convex/shared/types'

export const getCompetitionOrCurrent = async (
  ctx: QueryCtx,
  competitionId?: Competition['_id'],
) => {
  if (!competitionId) {
    const currentCompetition = await ctx.db
      .query('competitions')
      .order('desc')
      .first()
    if (!currentCompetition) return null
    competitionId = currentCompetition._id
  }
  return await ctx.db.get(competitionId)
}

export const createCompetition = async (ctx: MutationCtx) => {
  const previousCompetition = await ctx.db
    .query('competitions')
    .order('desc')
    .first()
  if (previousCompetition) {
    await ctx.db.patch(previousCompetition._id, {
      expired: true,
    })
  }
  await ctx.db.insert('competitions', {
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
    resultViews: [],
    expired: false,
  })
}

export const getCompetitionFlowEntries = async (
  ctx: QueryCtx,
  competitionId?: Competition['_id'],
) => {
  let id = competitionId
  if (!competitionId) {
    const currentCompetition = await ctx.db
      .query('competitions')
      .order('desc')
      .first()
    if (!currentCompetition) return []
    id = currentCompetition._id
  }
  const entries = await ctx.db
    .query('flowCompetitionEntries')
    .withIndex('by_competition', (q) => q.eq('competitionId', id!))
    .collect()

  return (
    await Promise.all(
      entries.map(async (entry) => {
        const user = (await ctx.db.get(entry.userId))!
        const { _id, _creationTime, competitionId, ...actualEntry } = entry
        return {
          username: user.username,
          avatar: user.avatar,
          ...actualEntry,
        }
      }),
    )
  ).sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: index + 1 }))
}

export const getCompetitionRapidEntries = async (
  ctx: QueryCtx,
  competitionId?: Competition['_id'],
) => {
  let id = competitionId
  if (!competitionId) {
    const currentCompetition = await ctx.db
      .query('competitions')
      .order('desc')
      .first()
    if (!currentCompetition) return []
    id = currentCompetition._id
  }
  const entries = await ctx.db
    .query('rapidCompetitionEntries')
    .withIndex('by_competition', (q) => q.eq('competitionId', id!))
    .collect()

  return (
    await Promise.all(
      entries.map(async (entry) => {
        const user = (await ctx.db.get(entry.userId))!
        const { _id, _creationTime, competitionId, ...actualEntry } = entry
        return {
          username: user.username,
          avatar: user.avatar,
          ...actualEntry,
        }
      }),
    )
  ).sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: index + 1 }))
}

export const getUserCompetitionFlowEntry = async (
  ctx: QueryCtx,
  userId: User['_id'],
  competitionId?: Competition['_id'],
) => {
  const user = (await ctx.db.get(userId))!
  let id = competitionId
  const defaultEntry = {
    userId: user._id,
    username: user.username,
    avatar: user.avatar,
    score: 0,
    avgTime: 0,
    round: 0,
    rank: 0,
  }
  if (!competitionId) {
    const currentCompetition = await ctx.db
      .query('competitions')
      .order('desc')
      .first()
    if (!currentCompetition) return defaultEntry
    id = currentCompetition._id
  }
  const userEntry = await ctx.db
    .query('flowCompetitionEntries')
    .withIndex('by_user_and_competition', (q) =>
      q.eq('userId', userId!).eq('competitionId', id!),
    )
    .unique()

  if (!userEntry) return defaultEntry

  const rank =
    (
      await ctx.db
        .query('flowCompetitionEntries')
        .withIndex('by_competition', (q) => q.eq('competitionId', id!))
        .collect()
    )
      .sort((a, b) => b.score - a.score)
      .findIndex((entry) => entry.userId === userId) + 1
  const { _id, _creationTime, competitionId: compId, ...entry } = userEntry

  return { ...entry, username: user.username, avatar: user.avatar, rank }
}

export const getUserCompetitionRapidEntry = async (
  ctx: QueryCtx,
  userId: User['_id'],
  competitionId?: Competition['_id'],
) => {
  const user = (await ctx.db.get(userId))!
  let id = competitionId
  const defaultEntry = {
    userId: user._id,
    username: user.username,
    avatar: user.avatar,
    score: 0,
    avgTime: 0,
    questions: 0,
    rank: 0,
  }
  if (!competitionId) {
    const currentCompetition = await ctx.db
      .query('competitions')
      .order('desc')
      .first()
    if (!currentCompetition) return defaultEntry
    id = currentCompetition._id
  }
  const userEntry = await ctx.db
    .query('rapidCompetitionEntries')
    .withIndex('by_user_and_competition', (q) =>
      q.eq('userId', userId!).eq('competitionId', id!),
    )
    .unique()

  if (!userEntry) return defaultEntry

  const rank =
    (
      await ctx.db
        .query('rapidCompetitionEntries')
        .withIndex('by_competition', (q) => q.eq('competitionId', id!))
        .collect()
    )
      .sort((a, b) => b.score - a.score)
      .findIndex((entry) => entry.userId === userId) + 1
  const { _id, _creationTime, competitionId: compId, ...entry } = userEntry

  return { ...entry, username: user.username, avatar: user.avatar, rank }
}

export const addUserFlowEntry = async (
  ctx: MutationCtx,
  userId: User['_id'],
  competitionId: Competition['_id'],
  data: { round: number; avgTime: number; score: number },
) => {
  const existingEntry = await ctx.db
    .query('flowCompetitionEntries')
    .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
    .filter((q) => q.eq(q.field('userId'), userId))
    .unique()

  if (existingEntry) {
    await ctx.db.patch(existingEntry._id, data)
  } else {
    await ctx.db.insert('flowCompetitionEntries', {
      competitionId,
      userId,
      ...data,
    })
  }
}

export const addUserRapidEntry = async (
  ctx: MutationCtx,
  userId: User['_id'],
  competitionId: Competition['_id'],
  data: { questions: number; avgTime: number; score: number },
) => {
  const existingEntry = await ctx.db
    .query('rapidCompetitionEntries')
    .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
    .filter((q) => q.eq(q.field('userId'), userId))
    .unique()

  if (existingEntry) {
    await ctx.db.patch(existingEntry._id, data)
  } else {
    await ctx.db.insert('rapidCompetitionEntries', {
      competitionId,
      userId,
      ...data,
    })
  }
}

export const getCompetitionResult = async (
  ctx: QueryCtx,
  userId: User['_id'],
  competitionId: Competition['_id'],
) => {
  const [flowCompetitionEntries, rapidCompetitionEntries] = await Promise.all([
    getCompetitionFlowEntries(ctx, competitionId),
    getCompetitionRapidEntries(ctx, competitionId),
  ])

  return {
    flow: {
      topPlayers: flowCompetitionEntries
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
      bestAvgTime: flowCompetitionEntries.sort(
        (a, b) => a.avgTime - b.avgTime,
      )[0],
      bestRound: flowCompetitionEntries.sort((a, b) => b.round - a.round)[0],
      userPerformance:
        flowCompetitionEntries.find((entry) => entry.userId === userId) ?? null,
      totalPlayers: flowCompetitionEntries.length,
    },
    rapid: {
      topPlayers: rapidCompetitionEntries
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
      bestAvgTime: rapidCompetitionEntries.sort(
        (a, b) => a.avgTime - b.avgTime,
      )[0],
      bestRound: rapidCompetitionEntries.sort(
        (a, b) => b.questions - a.questions,
      )[0],
      userPerformance:
        rapidCompetitionEntries.find((entry) => entry.userId === userId) ??
        null,
      totalPlayers: rapidCompetitionEntries.length,
    },
  }
}
