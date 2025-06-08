import Game from '@/components/game-modes/flow-game'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/practice/flow/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Game.FlowGameLayout>
      <Game.FlowGame quitTo={{ to: '/app/practice' }} />
    </Game.FlowGameLayout>
  )
}
