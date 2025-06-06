import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center text-center px-6 pt-15 pb-32 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative math symbols */}
      <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none">
        {['+', '−', '×', '÷', '=', '%', '√', 'π', '∑'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-primary text-6xl font-bold"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 40 - 20}deg)`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Glowing logo effect */}
      <div className="relative mb-8">
        <img
          src="/logo.svg"
          alt="Mathlify Logo"
          className="h-28 w-28 relative z-10"
        />
        <div className="absolute w-24 h-24 bg-primary/30 rounded-full filter blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Sharpen Your Mental Math Skills
      </h1>

      <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-2xl leading-relaxed">
        Compete, practice, and improve your calculation abilities through
        <span className="text-primary font-semibold"> engaging gameplay</span>.
        Challenge friends or climb the
        <span className="text-accent font-semibold"> global leaderboards</span>!
      </p>

      <div className="flex gap-4 items-center">
        <Button size="lg" className="font-bold text-lg py-7">
          <span>Start Playing Now</span>
          <ArrowRight size={20} />
        </Button>
        <Button size="lg" variant="outline" className='font-bold text-lg py-7 px-10'>
          <span>Watch Demo</span>
          <Play size={20} />
        </Button>
      </div>

      {/* Floating stats cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-16">
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-52">
          <div className="text-5xl font-bold text-primary mb-2">10K+</div>
          <div className="text-muted-foreground">Daily Active Users</div>
        </div>
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-52">
          <div className="text-5xl font-bold text-secondary mb-2">4.8</div>
          <div className="text-muted-foreground">Average Rating</div>
        </div>
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-52">
          <div className="text-5xl font-bold text-accent mb-2">2M+</div>
          <div className="text-muted-foreground">Problems Solved</div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
