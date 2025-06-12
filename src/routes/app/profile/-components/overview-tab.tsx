import FriendsList from './friends-list'
import RecentGames from './recent-games'
import QuickStats from './quick-stats'

const OverviewTab = () => {
  return (
    <div className="flex flex-col gap-8">
      <QuickStats />
      <RecentGames />
      <FriendsList all={false} />
    </div>
  )
}

export default OverviewTab
