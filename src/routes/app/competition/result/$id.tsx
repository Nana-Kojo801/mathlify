import { Zap, Brain, Loader2, ArrowLeft } from 'lucide-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchCompetitionResultQuery } from './-queries'
import type { Competition } from '@/types'
import GameModeSection from './-components/game-mode-section'
import { useEffect } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export const Route = createFileRoute('/app/competition/result/$id')({
  component: ResultPage,
  pendingComponent: () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  },
  loader: async ({ params, context: { queryClient, app } }) => {
    const user = app.auth.getState().user!
    await queryClient.ensureQueryData(
      fetchCompetitionResultQuery(params.id as Competition['_id'], user._id),
    )
  },
})

function ResultPage() {
  const { id } = Route.useParams()
  const viewResult = useMutation(api.competitions.viewResult)
  useEffect(() => {
    viewResult({ competitionId: id as Competition['_id'] })
  }, [])
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/app/competition" className="flex items-center space-x-2">
            <ArrowLeft className="size-5 text-primary" />
            <span className="text-xl font-bold text-primary">Result</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-8">
        <div className="space-y-16">
          <GameModeSection mode="flow" icon={Brain} />

          <div className="border-t border-border"></div>

          <GameModeSection mode="rapid" icon={Zap} />
        </div>
      </main>
    </div>
  )
}
