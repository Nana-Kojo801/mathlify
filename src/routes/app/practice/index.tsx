import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import GameModeSelection from './-components/game-mode-selection'
import CreateFlowPresetModal from './-components/create-flow-preset-modal'
import CreateRapidPresetModal from './-components/create-rapid-preset-modal'
import DifficultyOptions from './-components/difficulty-options'
import { PageHeader } from '@/components/page-header'
import { z } from 'zod'

const searchSchema = z.object({
  mode: z.union([z.literal("flow"), z.literal("rapid")]).default("flow")
})

export const Route = createFileRoute('/app/practice/')({
  component: PracticePage,
  validateSearch: searchSchema
})

function PracticePage() {
  const searchParams = Route.useSearch()
  const [showCreateFlowDialog, setShowCreateFlowDialog] = useState(false)
  const [showCreateRapidDialog, setShowCreateRapidDialog] =
    useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader title='Practice' />

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Game Mode Selection */}
        <GameModeSelection gameMode={searchParams.mode} />

        <DifficultyOptions
          gameMode={searchParams.mode}
          setShowCreateFlowDialog={setShowCreateFlowDialog}
          setShowCreateRapidDialog={setShowCreateRapidDialog}
        />
        
        <CreateFlowPresetModal
          open={showCreateFlowDialog}
          onOpenChange={setShowCreateFlowDialog}
        />

        <CreateRapidPresetModal
          open={showCreateRapidDialog}
          onOpenChange={setShowCreateRapidDialog}
        />
      </main>
    </div>
  )
}

export default PracticePage
