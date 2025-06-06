import { Sword } from 'lucide-react'

// function ActivityItem({
//   type,
//   mode,
//   result,
//   change,
//   date,
// }: {
//   type: string
//   mode?: string
//   result?: string
//   change?: string
//   date: string
// }) {
//   return (
//     <div className="flex items-center justify-between p-2 sm:p-3 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50">
//       <div className="flex items-center space-x-2 sm:space-x-3">
//         {type === 'game' ? (
//           mode === 'casual' ? (
//             <Brain className="w-5 h-5 text-primary" />
//           ) : (
//             <Zap className="w-5 h-5 text-secondary" />
//           )
//         ) : (
//           <Award className="w-5 h-5 text-yellow-500" />
//         )}
//         <div>
//           <p className="text-sm sm:text-base font-medium">
//             {type === 'game' ? `${result} ${mode} game` : `Earned achievement`}
//           </p>
//           <p className="text-xs text-muted-foreground">{date}</p>
//         </div>
//       </div>
//       {change && (
//         <span
//           className={`text-sm font-medium ${
//             change.startsWith('+') ? 'text-green-500' : 'text-red-500'
//           }`}
//         >
//           {change}
//         </span>
//       )}
//     </div>
//   )
// }

const RecentActivities = () => {
  const recentActivity = [
    {
      type: 'match',
      opponent: 'PrimeHunter',
      result: 'Won',
      eloChange: +15,
      date: '2 hours ago',
    },
    {
      type: 'match',
      opponent: 'FractionKing',
      result: 'Lost',
      eloChange: -8,
      date: 'Yesterday',
    },
  ]

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(/(?=[A-Z])|\s/)
      .filter((word) => word)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <button className="text-xs text-primary font-medium">View All</button>
      </div>
      <div className="space-y-2">
        {recentActivity.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Opponent avatar */}
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">
                    {getInitials(item.opponent)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center">
                    <Sword className="w-4 h-4 mr-1.5 text-muted-foreground" />
                    <span>
                      Match vs{' '}
                      <span className="font-medium">{item.opponent}</span>
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.date}
                  </div>
                </div>
              </div>

              <div>
                <span
                  className={`font-medium ${item.eloChange > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {item.eloChange > 0 ? '+' : ''}
                  {item.eloChange} ELO
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentActivities
