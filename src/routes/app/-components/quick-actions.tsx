import { Button } from '@/components/ui/button'
import { Activity, Sword, Users } from 'lucide-react'

const QuickActions = () => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        <Button className="h-16 flex flex-col items-center justify-center gap-1 bg-primary/10 hover:bg-primary/20">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">Practice</span>
        </Button>
        <Button className="h-16 flex flex-col items-center justify-center gap-1 bg-secondary/10 hover:bg-secondary/20">
          <Sword className="w-5 h-5 text-secondary" />
          <span className="text-sm text-foreground">Competition</span>
        </Button>
        <Button className="h-16 flex flex-col items-center justify-center gap-1 bg-accent/10 hover:bg-accent/20">
          <Users className="w-5 h-5 text-accent" />
          <span className="text-sm text-foreground">Online</span>
        </Button>
      </div>
    </section>
  )
}

export default QuickActions
