import Game from '@/components/game-modes/rapid-game'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/practice/rapid/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Game.RapidGameLayout>
      <Game.RapidGame quitTo={{ to: '/app/practice' }} />
    </Game.RapidGameLayout>
  )
}
