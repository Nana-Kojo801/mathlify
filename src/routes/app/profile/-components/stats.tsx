import { useUser } from "@/hooks/user"
import { Brain, Zap } from "lucide-react"

function StatCard({
    icon,
    title,
    value,
    change,
  }: {
    icon: React.ReactNode
    title: string
    value: number
    change: string
  }) {
    return (
      <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
          <div className="p-1 rounded-md bg-primary/10">{icon}</div>
          <h4 className="text-sm sm:text-base font-medium">{title}</h4>
        </div>
        <p className="text-xl sm:text-2xl font-bold mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{change}</p>
      </div>
    )
  }

const Stats = () => {
    const user = useUser()
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <StatCard
        icon={<Brain className="w-5 h-5 text-primary" />}
        title="Casual ELO"
        value={user.elo.casual}
        change="+24 this week"
      />
      <StatCard
        icon={<Zap className="w-5 h-5 text-secondary" />}
        title="Speed ELO"
        value={user.elo.speedSolve}
        change="+18 this week"
      />
    </div>
  )
}

export default Stats
