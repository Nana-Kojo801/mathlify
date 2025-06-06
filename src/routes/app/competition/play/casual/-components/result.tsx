import Game from '@/components/game-modes/casual-game'
import {
  useActions,
  useTimeUsed,
} from '@/components/game-modes/casual-game/casual-game-store'
import { StatItem, StatsGrid } from '@/components/game-modes/shared'
import { calculateCasualCompetitionScore } from '@/lib/helpers'
import { useNavigate } from '@tanstack/react-router'
import { FastForward, LogOut, RotateCw } from 'lucide-react'
import { useCallback } from 'react'


const Result = ({
  type,
  retry,
  nextRound,
  round,
  score,
  totalTime = 0
}: {
  type: 'correct' | 'wrong' | 'timeout'
  retry?: () => void
  nextRound?: () => void
  round: number,
  score: number;
  totalTime?: number
}) => {
  const navigate = useNavigate()
  const { reset } = useActions()
  const timeUsed = useTimeUsed()

  const quit = useCallback(() => {
    reset()
    navigate({ to: '/app/competition' })
  }, [reset, navigate])

  return (
    <Game.ResultLayout className="">
      {type === 'correct' && <Game.CorrectHeader />}
      {type === 'wrong' && <Game.WrongHeader />}
      {type === 'timeout' && <Game.TimeoutHeader />}

      <StatsGrid>
        {type === 'correct' ? (
          <>
            <StatItem label="Time used" value={`${timeUsed / 100}s`} />
            <StatItem label="Score" value={calculateCasualCompetitionScore(timeUsed, round)} />
            <StatItem label="Total score" value={score} className="col-span-2" />
          </>
        ) : (
          <>
            <StatItem label="Round" value={round} />
            <StatItem label="Avg time" value={`${((totalTime / round) / 100).toFixed(2)}s`} />
            <StatItem label="Total score" value={score} className="col-span-2" />
          </>
        )}
        <Game.ActionLayout className="col-span-2 mt-0 grid grid-cols-2">
          {type === 'correct' ? (
            <Game.ActionButton onClick={nextRound} className="w-full bg-green-600 text-foreground hover:bg-green-600">
              <FastForward className="size-[22]" />
              Next round
            </Game.ActionButton>
          ) : (
            <Game.ActionButton
              onClick={retry}
              className="w-full bg-yellow-600 text-foreground hover:bg-yellow-600"
            >
              <RotateCw className="size-[22]" />
              Retry
            </Game.ActionButton>
          )}
          <Game.ActionButton
            onClick={quit}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="size-[22]" />
            Quit
          </Game.ActionButton>
        </Game.ActionLayout>
      </StatsGrid>
      <Game.Review />
    </Game.ResultLayout>
  )
}

export default Result
