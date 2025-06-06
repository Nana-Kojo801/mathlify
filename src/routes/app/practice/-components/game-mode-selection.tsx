import type { GameType } from '@/types'
import { Brain, CheckIcon, Zap } from 'lucide-react'
import React from 'react'

type GameModeSelectionType = {
    gameMode: GameType
    setGameMode: React.Dispatch<React.SetStateAction<GameType>>
}

const GameModeSelection = ({ gameMode, setGameMode }: GameModeSelectionType) => {
  return (
    <section className="mb-4">
      <h2 className="text-xl font-bold mb-3">Game Mode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`bg-card/60 backdrop-blur-sm rounded-lg border ${
            gameMode === 'casual' ? 'border-primary' : 'border-border/50'
          } p-4 cursor-pointer`}
          onClick={() => setGameMode('casual')}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Casual</h3>
            </div>
            {gameMode === 'casual' && (
              <CheckIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Numbers appear one after another, calculate and input the sum at the
            end.
          </p>
        </div>

        <div
          className={`bg-card/60 backdrop-blur-sm rounded-lg border ${
            gameMode === 'speedSolve' ? 'border-secondary' : 'border-border/50'
          } p-4 cursor-pointer`}
          onClick={() => setGameMode('speedSolve')}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              <h3 className="font-medium">Speed Solve</h3>
            </div>
            {gameMode === 'speedSolve' && (
              <CheckIcon className="h-5 w-5 text-secondary" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Solve math expressions quickly and choose from multiple options.
          </p>
        </div>
      </div>
    </section>
  )
}

export default GameModeSelection
