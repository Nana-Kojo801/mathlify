const SearchingPlayers = () => {
  return (
    <>
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-center mb-2">
        Finding a rapid Match
      </h2>
      <p className="text-muted-foreground text-center">
        Searching for players with similar skill level...
      </p>
    </>
  )
}

const OpponentNotFound = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">
        Opponent Not Found
      </h2>
      <p className="text-muted-foreground text-center mb-6">
        We couldn't find a suitable opponent. Please try again.
      </p>
      <button className="mx-auto block px-4 py-2 bg-primary text-white rounded">Try Again</button>
    </>
  )
}

const MatchFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header with enhanced styling */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-3">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            MATCH FOUND!
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
        </div>

        {/* Players section with horizontal layout on all screens */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-6">
          {/* Player 1 */}
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
            </div>
          </div>

          {/* VS Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl"></div>
              <div className="relative z-10 bg-gradient-to-r from-primary to-primary/80 text-white px-5 py-2.5 rounded-full shadow-lg">
                <span className="text-xl md:text-2xl lg:text-3xl font-black">
                  VS
                </span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">
                  Rapid Mode
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                60 seconds • 5-10 questions
              </div>
            </div>
          </div>

          {/* Player 2 */}
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
            </div>
          </div>
        </div>

        {/* Bottom section with countdown or status */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm md:text-base font-medium text-primary">
              Preparing match...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FindRapidMatch = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-background">
      <SearchingPlayers />
      <OpponentNotFound />
      <MatchFound />
    </div>
  )
}

export default FindRapidMatch
