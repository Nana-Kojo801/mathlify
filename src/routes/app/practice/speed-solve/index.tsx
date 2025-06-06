import Game from '@/components/game-modes/speed-solve'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/practice/speed-solve/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Game.SpeedSolveGameLayout>
      <Game.SpeedSolveGame quitTo={{ to: '/app/practice' }} />
    </Game.SpeedSolveGameLayout>
  )
}
