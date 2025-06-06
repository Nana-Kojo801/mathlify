import { createFileRoute, Navigate } from '@tanstack/react-router'
import Header from './-components/header'
import HeroSection from './-components/sections/hero-section'
import GameModes from './-components/sections/game-modes'
import Features from './-components/sections/features'
import Testimonials from './-components/sections/testimonials'
import CtaSection from './-components/sections/cta-section'
import Footer from './-components/footer'
import { useAuth } from '@/components/auth-provider'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const { loading, authenticated } = useAuth()
  if (!loading && authenticated) return <Navigate to="/app" />
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <GameModes />
        <Features />
        <Testimonials />
        <CtaSection />
        <Footer />
      </div>
    </div>
  )
}
