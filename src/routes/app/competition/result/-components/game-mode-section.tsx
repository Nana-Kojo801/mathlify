import type { GameType } from "@/types"
import CompetitionTable from "./competition-table"
import StatsOverview from "./stats-overview"

const GameModeSection = ({
  mode,
  icon: Icon,
}: {
  mode: GameType
  icon: React.ComponentType<{ className?: string }>
}) => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
          <Icon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-primary text-lg">
            {mode === 'flow' ? 'Flow Mode' : 'Rapid Mode'}
          </span>
        </div>
      </div>

      <StatsOverview mode={mode} />
      <CompetitionTable mode={mode} />
    </div>
  )
}
export default GameModeSection
