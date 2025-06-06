import { BarChart3, ChevronRight, Plus, Settings, Star, Trophy, Users } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Compete & Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge others, track progress, and celebrate achievements with
            Mathlify's social features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature cards with hover effects */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <Trophy className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
              Global Rankings
            </h3>
            <p className="text-muted-foreground">
              Compete for top positions on worldwide leaderboards and earn
              recognition for your mental math abilities.
            </p>
            <div className="mt-6 flex items-center text-accent/80 group-hover:text-accent transition-colors">
              <span className="text-sm font-medium">View Leaderboards</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Users className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              Friend Challenges
            </h3>
            <p className="text-muted-foreground">
              Connect with friends, send challenges, and track each other's
              progress as you improve together.
            </p>
            <div className="mt-6 flex items-center text-primary/80 group-hover:text-primary transition-colors">
              <span className="text-sm font-medium">Find Friends</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
              <Settings className="text-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
              Custom Difficulty
            </h3>
            <p className="text-muted-foreground">
              Tailor your practice sessions with adjustable settings to match
              your skill level and learning objectives.
            </p>
            <div className="mt-6 flex items-center text-secondary/80 group-hover:text-secondary transition-colors">
              <span className="text-sm font-medium">Customize Settings</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-chart-4/20 transition-colors">
              <BarChart3 className="text-chart-4" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-chart-4 transition-colors">
              Progress Tracking
            </h3>
            <p className="text-muted-foreground">
              Monitor your improvement over time with detailed statistics and
              performance analytics.
            </p>
            <div className="mt-6 flex items-center text-chart-4/80 group-hover:text-chart-4 transition-colors">
              <span className="text-sm font-medium">View Analytics</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-chart-5/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-chart-5/20 transition-colors">
              <Star className="text-chart-5" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-chart-5 transition-colors">
              Achievements
            </h3>
            <p className="text-muted-foreground">
              Unlock badges and rewards as you reach milestones and master
              different math challenges.
            </p>
            <div className="mt-6 flex items-center text-chart-5/80 group-hover:text-chart-5 transition-colors">
              <span className="text-sm font-medium">Explore Achievements</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Plus className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              Weekly Tournaments
            </h3>
            <p className="text-muted-foreground">
              Participate in weekly competitions with themed challenges and
              special rewards for top performers.
            </p>
            <div className="mt-6 flex items-center text-primary/80 group-hover:text-primary transition-colors">
              <span className="text-sm font-medium">Join Tournament</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
