import { ArrowRight, ChevronRight } from 'lucide-react'

const CtaSection = () => {
  return (
    <section id="cta" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Challenge Your Mind?
        </h2>
        <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
          Join thousands of players already sharpening their mental math skills
          with Mathlify's engaging gameplay. Download today and start your
          journey!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all">
            <span>Download Now</span>
            <ArrowRight size={20} />
          </button>
          <button className="bg-background/60 backdrop-blur-sm border border-primary/30 text-foreground px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-primary/10 transition-all">
            <span>Learn More</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
