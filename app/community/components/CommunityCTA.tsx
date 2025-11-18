"use client"

import { ScrollSection } from "@/components/layout/ScrollSection"

export function CommunityCTA() {
  return (
    <ScrollSection direction="scale">
      <section className="py-32 px-6 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">Ready for Real Change?</h2>
          <p className="font-sans text-xl leading-relaxed mb-12 opacity-90">
            Join my Skool community and start your journey of authentic transformation. This isn't about
            motivation—it's about lasting change through practical spirituality and optimized health.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              className="bg-white text-amber-600 px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg"
              data-magnetic
            >
              Join the Community
            </button>
            <button
              className="border-2 border-white text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300"
              data-magnetic
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </ScrollSection>
  )
}