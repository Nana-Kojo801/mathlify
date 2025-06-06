import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const Header = () => {
  return (
    <header className="sticky top-0 w-full py-4 px-6 backdrop-blur-md bg-background/80 border-b border-border flex justify-between items-center z-50">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Mathlify Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold text-primary">Mathlify</span>
      </div>
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#game-modes"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Game Modes
          </a>
          <a
            href="#cta"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Download
          </a>
        </nav>
        <Link to='/auth/signup'>
          <Button>Get Started</Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
