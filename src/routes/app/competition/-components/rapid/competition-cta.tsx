import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Zap } from 'lucide-react'
import { useActions } from '@/components/game-modes/rapid-game/rapid-game-store'

const CompetitionCta = () => {
  const navigate = useNavigate()
  const { init } = useActions()
  return (
    <div className="mb-8 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Rapid Marathon</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Advance through increasingly difficult rounds. Your best score combines rounds completed and speed.
          </p>
        </div>
        <Button
          onClick={() => {
            init({
              duration: 15,
              quantity: { min: 4, max: 7 },
              range: { min: 1, max: 9 }
            })
            navigate({ to: '/app/competition/play/rapid' })
          }}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
        >
          <Zap className="w-4 h-4 mr-2" />
          Play
        </Button>
      </div>
    </div>
  )
}

export default CompetitionCta
