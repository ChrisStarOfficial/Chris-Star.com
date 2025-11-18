"use client"

import { ScrollSection } from "@/components/layout/ScrollSection"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Lightworker & Health Coach",
    quote: "Chris's community transformed my relationship with food and my spiritual practice. The carnivore approach combined with shadow work has been life-changing.",
    transformation: "Lost 30lbs, Gained Clarity",
  },
  {
    name: "Michael R.",
    role: "Starseed Entrepreneur",
    quote: "Finally found a community that understands both the spiritual journey and practical health optimization. The weekly calls are pure gold.",
    transformation: "Built Muscle, Found Purpose",
  },
  {
    name: "Luna K.",
    role: "Spiritual Teacher",
    quote: "The shadow work guidance here goes deeper than anything I've experienced. Chris creates a safe space for real transformation.",
    transformation: "Integrated Shadows, Expanded Consciousness",
  },
]

export function CommunityTestimonials() {
  return (
    <ScrollSection direction="fade">
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Transformation Stories</h2>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Real results from community members who chose transformation over inspiration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <ScrollSection key={index} direction="up" delay={index * 200}>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-amber-600 transition-all duration-500">
                  <blockquote className="font-sans italic text-lg text-gray-300 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="font-sans font-bold text-xl text-white mb-1">{testimonial.name}</h4>
                    <p className="font-sans text-amber-400 text-sm mb-3">{testimonial.role}</p>
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-sans font-semibold rounded-full">
                      {testimonial.transformation}
                    </div>
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>
    </ScrollSection>
  )
}