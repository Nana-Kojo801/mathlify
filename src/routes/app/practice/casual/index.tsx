import Game from '@/components/game-modes/casual-game'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/practice/casual/')({
  component: PlayCasual,
})

function PlayCasual() {
  return (
    <Game.CasualGameLayout>
      <Game.CasualGame quitTo={{ to: '/app/practice' }} />
    </Game.CasualGameLayout>
  )
}
