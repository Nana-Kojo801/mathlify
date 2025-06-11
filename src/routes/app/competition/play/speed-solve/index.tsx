import Game from '@/components/game-modes/speed-solve'
import { useGameState } from '@/components/game-modes/speed-solve/speed-solve-game-store'
import { createFileRoute } from '@tanstack/react-router'
import Questions from './-components/questions'

export const Route = createFileRoute('/app/competition/play/speed-solve/')({
  component: RouteComponent,
})

function RouteComponent() {
    const gameState = useGameState()
  return (
    <Game.SpeedSolveGameLayout>
        <Game.SpeedSolveGame
            quitTo={{ to: '/app/competition' }}
            custom={["questions"]}
        >
            {gameState === "questions" && <Questions />}
        </Game.SpeedSolveGame>
    </Game.SpeedSolveGameLayout>
  )
}
