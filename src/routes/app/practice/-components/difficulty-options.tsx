import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { GameType } from '@/types'
import SavedPresets from './saved-presets'
import CasualSettings from './flow-settings'
import SpeedSolveSettings from './rapid-settings'

type DifficultyOptionsProps = {
  gameMode: GameType
  setShowCreateFlowDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowCreateRapidDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DifficultyOptions = ({
  gameMode,
  setShowCreateFlowDialog,
  setShowCreateRapidDialog,
}: DifficultyOptionsProps) => {
  return (
    <section>
      <h2 className="text-lg font-bold mb-2">Difficulty Options</h2>
      <Tabs defaultValue="saved-presets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
          <TabsTrigger
            value="saved-presets"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span>Saved presets</span>
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span>Custom</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved-presets">
          <SavedPresets
            gameMode={gameMode}
            setShowCreateFlowDialog={setShowCreateFlowDialog}
            setShowCreateRapidDialog={setShowCreateRapidDialog}
          />
        </TabsContent>

        <TabsContent value="custom">
          {gameMode === 'flow' && (
            <CasualSettings />
          )}

          {/* Difficulty Settings for Speed Solve Mode */}
          {gameMode === 'rapid' && (
            <SpeedSolveSettings />
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default DifficultyOptions
