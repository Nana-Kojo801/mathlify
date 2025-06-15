import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Plus, Users, Search } from 'lucide-react'

const RoomTab = () => {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Sparkles className="text-primary w-4 h-4" />
          Join with Code
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter a room code to join a private game or create your own room
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter room code (e.g., ABC123)..."
              className="bg-muted/20 h-11 flex-1"
            />
            <Button className="h-11 px-6 font-medium sm:w-auto">
              Join Room
            </Button>
          </div>
          <Button className="w-full gap-2 h-11 px-6 font-medium">
            <Plus className="w-4 h-4" />
            Create Private Room
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-border/30"></div>

      {/* Public Rooms Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <Users className="w-4 h-4 text-primary" />
            Public Rooms
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Join active games with other players
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            placeholder="Search rooms by name, mode, or skill level..."
            className="bg-muted/20 pl-10 h-11"
          />
        </div>

        <div className="space-y-3">
          <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Daily Tournament Hall</h3>
              <span className="text-xs text-muted-foreground">Competitive</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">12/16</div>
              <div className="text-xs text-muted-foreground">players</div>
            </div>
          </div>

          <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Speed Practice Arena</h3>
              <span className="text-xs text-muted-foreground">Casual</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">4/6</div>
              <div className="text-xs text-muted-foreground">players</div>
            </div>
          </div>

          <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Elite Challenge Room</h3>
              <span className="text-xs text-muted-foreground">Competitive</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">2/4</div>
              <div className="text-xs text-muted-foreground">players</div>
            </div>
          </div>

          <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Friendly Matches</h3>
              <span className="text-xs text-muted-foreground">Casual</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">8/12</div>
              <div className="text-xs text-muted-foreground">players</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomTab
