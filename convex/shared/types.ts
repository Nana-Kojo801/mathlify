import type { Doc } from '@convex/_generated/dataModel'

export type User = Doc<'users'>
export type Preset = Doc<'presets'>
export type Competition = Doc<'competitions'>
export type FlowCompetitionEntry = Doc<'flowCompetitionEntries'>
export type RapidCompetitionEntry = Doc<'rapidCompetitionEntries'>
export type FriendMessage = Doc<'friendMessages'>
export type FriendRequest = Doc<'friendRequests'>

export type PresetSettings = {
  timeInterval?: number | undefined
  range: {
    min: number
    max: number
  }
  quantity: {
    min: number
    max: number
  }
  duration: number
}

export type CompetitionFlowEntry = {
  userId: User['_id']
  round: number
  avgTime: number
  score: number
  username: string
  avatar: string
}

export type CompetitionRapidEntry = {
  userId: User['_id']
  questions: number
  avgTime: number
  score: number
  username: string
  avatar: string
}
