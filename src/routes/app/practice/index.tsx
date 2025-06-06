import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Header from './-components/header'
import type { GameType } from '@/types'
import GameModeSelection from './-components/game-mode-selection'
import CreateCasualPresetModal from './-components/create-casual-preset-modal'
import CreateSpeedSolvePresetModal from './-components/create-speed-solve-preset-modal'
import DifficultyOptions from './-components/difficulty-options'

export const Route = createFileRoute('/app/practice/')({
  component: PracticePage,
})

function PracticePage() {
  const [gameMode, setGameMode] = useState<GameType>('casual')
  const [showCreateCasualDialog, setShowCreateCasualDialog] = useState(false)
  const [showCreateSpeedSolveDialog, setShowCreateSpeedSolveDialog] =
    useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Game Mode Selection */}
        <GameModeSelection setGameMode={setGameMode} gameMode={gameMode} />

        <DifficultyOptions
          gameMode={gameMode}
          setShowCreateCasualDialog={setShowCreateCasualDialog}
          setShowCreateSpeedSolveDialog={setShowCreateSpeedSolveDialog}
        />
        
        <CreateCasualPresetModal
          open={showCreateCasualDialog}
          onOpenChange={setShowCreateCasualDialog}
        />

        <CreateSpeedSolvePresetModal
          open={showCreateSpeedSolveDialog}
          onOpenChange={setShowCreateSpeedSolveDialog}
        />
      </main>
    </div>
  )
}

export default PracticePage
