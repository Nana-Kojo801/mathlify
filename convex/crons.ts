import { cronJobs } from 'convex/server'
import { api } from './_generated/api'

const crons = cronJobs()

crons.weekly(
  'Weekly Competition',
  { dayOfWeek: 'sunday', hourUTC: 22, minuteUTC: 0 },
  api.competitions.create,
)

export default crons