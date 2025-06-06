import { useGameState } from '@/components/game-modes/casual-game/casual-game-store'
import { motion } from 'framer-motion'
import { Target, Trophy, Zap } from 'lucide-react'

const StatsHeader = ({ round, score }: { round: number; score: number }) => {
  const state = useGameState()
  const isVisible = ['countdown', 'questions', 'answer'].includes(state)

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full h-14 flex items-center justify-center bg-card/80 backdrop-blur-sm border-b border-border/20 shadow-sm"
    >
      <div className="flex items-center gap-6 px-6 w-full max-w-2xl">
        {/* Round Indicator */}
        <div className="flex items-center gap-2.5 bg-muted/40 px-3.5 py-1.5 rounded-full border border-border/30">
          <Target className="w-4 h-4 text-primary" strokeWidth={2.5} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Round
            </span>
            <span className="text-base font-bold">{round}</span>
          </div>
          <div className="w-1.5 h-1.5 ml-1 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border/40 rotate-12" />

        {/* Score Indicator */}
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-primary/5 to-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
          <Trophy
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Score
            </span>
            <span className="text-base font-bold">{score}</span>
          </div>
          <Zap className="w-3.5 h-3.5 ml-1 text-yellow-500 fill-yellow-500/20" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsHeader
