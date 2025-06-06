import { Brain, Calculator, Clock, Zap } from 'lucide-react'

const GameModes = () => {
  return (
    <section
      id="game-modes"
      className="bg-card/60 backdrop-blur-sm py-24 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Exciting Game Modes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with different gameplay styles designed to test
            and improve various mental math skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Casual Mode Card */}
          <div className="bg-background/50 backdrop-blur-md rounded-xl border border-border/50 shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Brain className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold">Casual Mode</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Test your addition skills as numbers appear one after another.
              Calculate the running sum and submit your final answer when the
              sequence ends.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1.5 mr-3 mt-0.5">
                  <Calculator size={16} className="text-primary" />
                </div>
                <div>
                  <span className="font-medium">Sequential Number Display</span>
                  <p className="text-sm text-muted-foreground">
                    Numbers appear one at a time with adjustable timing
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1.5 mr-3 mt-0.5">
                  <Brain size={16} className="text-primary" />
                </div>
                <div>
                  <span className="font-medium">Memory Challenge</span>
                  <p className="text-sm text-muted-foreground">
                    Practice working memory and addition skills simultaneously
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Speed Solve Mode Card */}
          <div className="bg-background/50 backdrop-blur-md rounded-xl border border-border/50 shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                <Zap className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold">Speed Solve Mode</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Race against the clock to solve math expressions with multiple
              operations. Choose the correct answer from four options as quickly
              as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-1.5 mr-3 mt-0.5">
                  <Zap size={16} className="text-secondary" />
                </div>
                <div>
                  <span className="font-medium">Rapid-fire Questions</span>
                  <p className="text-sm text-muted-foreground">
                    Mixed operations with multiple choice answers
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-secondary/20 p-1.5 mr-3 mt-0.5">
                  <Clock size={16} className="text-secondary" />
                </div>
                <div>
                  <span className="font-medium">Time Pressure</span>
                  <p className="text-sm text-muted-foreground">
                    Solve as many problems as possible within time limit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameModes
