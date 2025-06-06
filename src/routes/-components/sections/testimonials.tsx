import { Star } from 'lucide-react'

const Testimonial = () => {
  return (
    <div className="bg-background/60 p-6 rounded-xl border border-border/50 shadow-lg hover:shadow-xl transition-all">
      <div className="flex mb-4 text-accent">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} fill="currentColor" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6">
        "Mathlify has transformed how I approach mental calculations. The
        competitive aspect keeps me coming back every day!"
      </p>
      <div className="font-medium">Alex T.</div>
      <div className="text-sm text-muted-foreground">Math Teacher</div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className="bg-card/40 backdrop-blur-sm py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
          Join thousands of users who are already improving their mental math
          skills with Mathlify.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
