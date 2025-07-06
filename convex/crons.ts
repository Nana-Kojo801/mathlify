import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.weekly(
  'Weekly Competition',
  { dayOfWeek: 'sunday', hourUTC: 22, minuteUTC: 0 },
  internal.competitions.create,
)

export default crons