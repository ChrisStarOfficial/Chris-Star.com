"use client"

import { ScrollSection } from "@/components/layout/scroll-section"

interface HeroSectionProps {
  mousePosition: { x: number; y: number }
}

export function HeroSection({ mousePosition }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-10 w-40 h-40 bg-amber-600 rounded-full blur-3xl"
          style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-60 h-60 bg-amber-500 rounded-full blur-3xl"
          style={{ transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)` }}
        />
      </div>

      <div className="text-center relative z-10 max-w-4xl mx-auto">
        <ScrollSection direction="fade">
          <h1 className="font-sans font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight leading-tight">
            Deepen Your Spiritual Practice with Chris Star
          </h1>
        </ScrollSection>

        <ScrollSection direction="up" delay={200}>
          <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Transform your spiritual journey from passive watching to active growth and community connection
          </p>
        </ScrollSection>

        <ScrollSection direction="scale" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/community"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[200px]"
              data-magnetic
            >
              Explore the Community
            </a>
            <a
              href="https://youtube.com/@ChrisStarOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center min-w-[200px]"
              data-magnetic
            >
              Watch Free Videos
            </a>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}