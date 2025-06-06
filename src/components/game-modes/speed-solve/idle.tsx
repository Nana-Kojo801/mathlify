import { Button } from '../../ui/button'
import { PlayIcon } from 'lucide-react'
import { useActions } from './speed-solve-game-store'

const Idle = () => {
  const { setState } = useActions()
  return (
    <Button
      className="w-[150px] text-xl"
      onClick={() => setState('countdown')}
    >
      <PlayIcon />
      Start
    </Button>
  )
}

export default Idle
