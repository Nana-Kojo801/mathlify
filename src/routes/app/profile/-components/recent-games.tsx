// import { Button } from '@/components/ui/button'
// import { Brain, Zap, Eye } from 'lucide-react'

const RecentGames = () => {
  // const recentActivity = [
  //   {
  //     type: 'game',
  //     mode: 'flow',
  //     result: 'Won',
  //     change: '+15',
  //     opponent: 'User123',
  //     time: '2h ago',
  //     duration: '18m',
  //   },
  //   {
  //     type: 'game',
  //     mode: 'rapid',
  //     result: 'Lost',
  //     change: '-8',
  //     opponent: 'MathPro',
  //     time: '5h ago',
  //     duration: '24m',
  //   },
  //   {
  //     type: 'game',
  //     mode: 'flow',
  //     result: 'Won',
  //     change: '+12',
  //     opponent: 'ChessNinja',
  //     time: '1d ago',
  //     duration: '16m',
  //   },
  //   {
  //     type: 'game',
  //     mode: 'rapid',
  //     result: 'Won',
  //     change: '+18',
  //     opponent: 'PuzzleMaster',
  //     time: '2d ago',
  //     duration: '31m',
  //   },
  //   {
  //     type: 'game',
  //     mode: 'flow',
  //     result: 'Lost',
  //     change: '-10',
  //     opponent: 'StrategyPro',
  //     time: '3d ago',
  //     duration: '14m',
  //   },
  // ]
  return (
    <div className='flex flex-col gap-2'>
      <h3 className="text-lg font-bold">Recent Games</h3>
      <div className="flex flex-col gap-3">
        {/* {recentActivity.slice(0, 3).map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <div className="flex items-center gap-3">
              {activity.mode === 'flow' ? (
                <div className="p-2 rounded-full bg-primary/10">
                  <Brain className="size-4 text-primary" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-secondary/10">
                  <Zap className="size-4 text-secondary" />
                </div>
              )}
              <div>
                <p className="font-medium text-sm">
                  {activity.result} vs {activity.opponent}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
            <span
              className={`font-bold ${activity.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}
            >
              {activity.change}
            </span>
          </div>
        ))} */}
        {/* <Button className="w-full" variant="outline">
          <Eye />
          View more
        </Button> */}
        <p>No games played yet</p>
      </div>
    </div>
  )
}

export default RecentGames
