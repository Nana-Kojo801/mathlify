import { Zap, Brain, Loader2, ArrowLeft } from 'lucide-react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { fetchCompetitionResultQuery } from './-components/queries'
import type { Competition } from '@/types'
import GameModeSection from './-components/game-mode-section'

export const Route = createFileRoute('/app/competition/result/$id')({
  component: ResultPage,
  beforeLoad: ({ context: { auth } }) => {
    const user = auth.user!
    if (!user.lastCompetition) throw redirect({ to: '/app/competition' })
  },
  pendingComponent: () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  },
  loader: async ({ params, context: { queryClient, auth } }) => {
    const user = auth.user!
    await queryClient.ensureQueryData(
      fetchCompetitionResultQuery(params.id as Competition['_id'], user._id),
    )
  },
})

function ResultPage() {
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
