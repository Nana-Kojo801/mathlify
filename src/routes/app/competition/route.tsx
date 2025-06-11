import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  fetchCompetitionQuery,
  fetchFlowEntriesQuery,
  fetchFlowEntryQuery,
  fetchRapidEntriesQuery,
  fetchRapidEntryQuery,
  fetchShouldShowResultQuery,
} from './-components/queries'
import { Clock, Loader2, Trophy } from 'lucide-react'
import { useCompetition } from './-components/hooks'

export const Route = createFileRoute('/app/competition')({
  component: RouteComponent,
  loader: async ({ context: { queryClient, auth } }) => {
    const user = auth.user!
    await Promise.all([
      queryClient.ensureQueryData(fetchCompetitionQuery()),
      queryClient.ensureQueryData(fetchFlowEntriesQuery()),
      queryClient.ensureQueryData(fetchRapidEntriesQuery()),
      queryClient.ensureQueryData(
        fetchFlowEntryQuery(user._id),
      ),
      queryClient.ensureQueryData(
        fetchRapidEntryQuery(user._id),
      ),
      queryClient.ensureQueryData(
        fetchShouldShowResultQuery(user._id, user.lastCompetition),
      ),
    ])
  },
  pendingComponent: () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  },
})

function RouteComponent() {
  const competition = useCompetition()
  if (!competition)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 px-4">
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-pulse flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          No Active Competition
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-xl animate-spin-slow rounded-full" />
          <p className="text-lg text-center relative z-10 flex items-center gap-2 justify-center">
            <Clock className="h-5 w-5" />
            Looks like you're early to the party! 🎉
          </p>
        </div>
        <p className="text-gray-600 text-center max-w-sm text-sm">
          Stay tuned for upcoming competitions. We're cooking up something
          exciting! ✨
        </p>
      </div>
    )
  return <Outlet />
}
