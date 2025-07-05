import Game from '@/components/game-modes/rapid-game'

const Countdown = () => {
  return <p className="text-5xl font-bold text-foreground">3</p>
}

const Question = () => {
  return <Game.Questions onCorrect={() => {}} customTimer={60} />
}

const Result = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header with enhanced styling */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            IT'S A DRAW!
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
        </div>
        {/* Players section with horizontal layout on all screens */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-6">
          {/* Player 1 (User) */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105 bg-gray-200" />
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                User
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm md:text-base text-muted-foreground font-medium">
                  Elo: 0
                </span>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
                  0
                </div>
                <div className="text-sm text-muted-foreground font-medium">questions</div>
              </div>
            </div>
          </div>
          {/* VS Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl"></div>
              <div className="relative z-10 bg-gradient-to-r from-primary to-primary/80 text-white px-5 py-2.5 rounded-full shadow-lg">
                <span className="text-xl md:text-2xl lg:text-3xl font-black">VS</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">Rapid Mode</span>
              </div>
              <div className="text-sm text-muted-foreground">Match Complete</div>
            </div>
          </div>
          {/* Player 2 (Opponent) */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105 bg-gray-200" />
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                Opponent
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm md:text-base text-muted-foreground font-medium">
                  Elo: ???
                </span>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
                  0
                </div>
                <div className="text-sm text-muted-foreground font-medium">questions</div>
              </div>
            </div>
          </div>
        </div>
        {/* Action buttons with enhanced styling */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <button className="px-7 py-2.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              Next Match
            </button>
            <button className="px-7 py-2.5 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 text-foreground font-semibold border border-muted/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Quit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Play = () => {
  return (
    <Game.RapidGameLayout>
      <Game.RapidGame custom={['countdown', 'questions']} quitTo={{ to: '/app/online' }}>
        <Countdown />
        <Question />
        <Result />
      </Game.RapidGame>
    </Game.RapidGameLayout>
  )
}

export default Play
