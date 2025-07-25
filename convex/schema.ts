import { defineSchema } from 'convex/server'
import { userGameData, userTable } from './models/users/table'
import friendRequestsTable from './models/friendRequests/table'
import friendMessagesTable from './models/friendMessages/table'
import presetsTable from './models/presets/table'
import {
  competitions,
  flowCompetitionEntries,
  rapidCompetitionEntries,
} from './models/competitions/table'
import { authTables } from '@convex-dev/auth/server'

export default defineSchema({
  ...authTables,
  users: userTable,
  userGameData: userGameData,
  friendRequests: friendRequestsTable,
  friendMessages: friendMessagesTable,
  presets: presetsTable,
  flowCompetitionEntries: flowCompetitionEntries,
  rapidCompetitionEntries: rapidCompetitionEntries,
  competitions: competitions
})
