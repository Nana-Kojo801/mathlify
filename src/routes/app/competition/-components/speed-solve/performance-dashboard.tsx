import { Award, BarChart2, Clock, TrendingUp } from 'lucide-react'
import React from 'react'
import useSpeedSolveEntry from '../useSpeedSolveEntry'

function StatCard({
  icon,
  title,
  value,
  description,
  color = 'primary',
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  description: string
  color?: 'primary' | 'success' | 'warning' | 'info'
}) {
  const colorClasses = {
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    success: 'bg-green-500/10 text-green-600 dark:text-green-400',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    info: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  }

  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-border/80">
      {/* Mobile-first header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div
            className={`p-2 sm:p-2.5 rounded-lg ${colorClasses[color]} flex-shrink-0`}
          >
            {icon}
          </div>
          <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
            {title}
          </h4>
        </div>
      </div>

      {/* Value and description */}
      <div className="space-y-1">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

const PerformanceDashboard = () => {
  const player = useSpeedSolveEntry()

  return (
    <div className="w-full mb-11">
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        <StatCard
          icon={<Award className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Current Rank"
          value={`#${player.rank}`}
          description="Global ranking"
          color="warning"
        />
        <StatCard
          icon={<BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Questions"
          value={player.questions}
          description="Highest number of questions answered"
          color="info"
        />
        <StatCard
          icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Avg Time"
          value={player.avgTime}
          description="Per round average"
          color="primary"
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Best Score"
          value={player.score}
          description="Highest achieved score"
          color="success"
        />
      </div>
    </div>
  )
}

export default PerformanceDashboard
