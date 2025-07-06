import { defineSchema } from 'convex/server'
import { userGameData, userTable } from './models/users/table'
import friendRequestsTable from './models/friendRequests/table'
import {
  friendMessagesTable,
  userConversationsTable,
} from './models/friendMessages/table'
import presetsTable from './models/presets/table'
import {
  competitions,
  flowCompetitionEntries,
  rapidCompetitionEntries,
} from './models/competitions/table'

export default defineSchema({
  users: userTable,
  userGameData: userGameData,
  friendRequests: friendRequestsTable,
  friendMessages: friendMessagesTable,
  userConversations: userConversationsTable,
  presets: presetsTable,
  flowCompetitionEntries: flowCompetitionEntries,
  rapidCompetitionEntries: rapidCompetitionEntries,
  competitions: competitions
})
