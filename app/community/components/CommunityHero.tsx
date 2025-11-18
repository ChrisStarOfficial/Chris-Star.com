"use client"

import { useState, useEffect } from "react"
import { ScrollSection } from "@/components/layout/ScrollSection"

export function CommunityHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-amber-900 via-gray-900 to-amber-800 overflow-hidden">
      {/* Layered Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-20 left-10 w-40 h-40 bg-amber-600 rounded-full blur-3xl animate-parallax-float"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-60 h-60 bg-amber-500 rounded-full blur-3xl"
          style={{ 
            animationDelay: "2s",
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-amber-400 rounded-full blur-2xl"
          style={{ 
            animationDelay: "4s",
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        />
      </div>

      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
      </div>

      <div className="text-center relative z-10 max-w-5xl mx-auto">
        <ScrollSection direction="fade">
          <h1 className="font-sans font-bold text-6xl md:text-8xl text-white mb-8 tracking-tight">
            Spiritual Transformation
          </h1>
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-amber-400 mb-12 tracking-tight">Community</h2>
        </ScrollSection>

        <ScrollSection direction="up" delay={300}>
          <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Join my exclusive Skool community where lightworkers, starseeds, and spiritual seekers come together for
            real transformation. This is my main offering—a comprehensive platform for your spiritual and physical
            optimization journey.
          </p>
          <p className="font-sans font-light text-lg text-amber-300 max-w-3xl mx-auto leading-relaxed mb-16">
            Weekly live calls, exclusive courses, shadow work guidance, carnivore nutrition protocols, and a
            supportive community that understands your path.
          </p>
        </ScrollSection>

        <ScrollSection direction="scale" delay={600}>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-sans font-bold text-amber-400 mb-2">500+</div>
              <p className="font-sans text-sm text-gray-400 uppercase tracking-wider">Active Members</p>
            </div>
            <div className="w-px h-16 bg-amber-600 opacity-30"></div>
            <div className="text-center">
              <div className="text-4xl font-sans font-bold text-amber-400 mb-2">95%</div>
              <p className="font-sans text-sm text-gray-400 uppercase tracking-wider">Transformation Rate</p>
            </div>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}