"use client"

import { useState, useEffect } from "react"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { CSLogoEasterEgg } from "@/components/cs-logo-easter-egg"

const communityFeatures = [
  {
    title: "Weekly Live Calls",
    description: "Join me every week for deep-dive sessions on spiritual growth, health optimization, and shadow work integration.",
    icon: "🎥",
    frequency: "Every Tuesday",
  },
  {
    title: "Exclusive Courses",
    description: "Access comprehensive courses on carnivore nutrition, muscle building, consciousness expansion, and starseed awakening.",
    icon: "📚",
    frequency: "Monthly Releases",
  },
  {
    title: "Shadow Work Guidance",
    description: "Personalized support and group sessions for deep shadow integration and inner transformation work.",
    icon: "🌑",
    frequency: "Bi-weekly Sessions",
  },
]

const communityBenefits = [
  {
    title: "Transformational Community",
    description: "Connect with like-minded lightworkers, starseeds, and spiritual seekers on the path of authentic growth.",
    value: "Priceless Network",
  },
  {
    title: "Direct Access to Chris",
    description: "Get personal guidance and answers to your questions during live calls and community discussions.",
    value: "1-on-1 Support",
  },
  {
    title: "Comprehensive Resources",
    description: "Access to all courses, guides, meal plans, workout routines, and spiritual practices in one place.",
    value: "$2000+ Value",
  },
  {
    title: "Accountability Partners",
    description: "Find your tribe and create lasting accountability partnerships for your health and spiritual journey.",
    value: "Lifelong Bonds",
  },
]

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

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("features")
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for parallax
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      <MagneticCursor />

      {/* Hero Section */}
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
          <AdvancedScrollSection direction="fade">
            <h1 className="font-sans font-bold text-6xl md:text-8xl text-white mb-8 tracking-tight">
              Spiritual Transformation
            </h1>
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-amber-400 mb-12 tracking-tight">Community</h2>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="up" delay={300}>
            <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Join my exclusive Skool community where lightworkers, starseeds, and spiritual seekers come together for
              real transformation. This is my main offering—a comprehensive platform for your spiritual and physical
              optimization journey.
            </p>
            <p className="font-sans font-light text-lg text-amber-300 max-w-3xl mx-auto leading-relaxed mb-16">
              Weekly live calls, exclusive courses, shadow work guidance, carnivore nutrition protocols, and a
              supportive community that understands your path.
            </p>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={600}>
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
          </AdvancedScrollSection>
        </div>
      </section>

      {/* Navigation Tabs */}
      <AdvancedScrollSection direction="up">
        <section className="py-16 px-6 bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center space-x-8">
              {[
                { id: "features", label: "Features" },
                { id: "benefits", label: "Benefits" },
                { id: "testimonials", label: "Testimonials" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-sans text-lg px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                  }`}
                  data-magnetic
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Features Section */}
      {activeTab === "features" && (
        <AdvancedScrollSection direction="stagger">
          <section className="py-32 px-6 bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Community Features</h2>
                <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Everything you need for complete spiritual and physical transformation in one comprehensive platform.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {communityFeatures.map((feature, index) => (
                  <AdvancedScrollSection key={index} direction="up" delay={index * 200}>
                    <div
                      className="group bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 p-10"
                      data-magnetic
                    >
                      <div className="text-6xl mb-6">{feature.icon}</div>
                      <h3 className="font-sans font-bold text-2xl text-white mb-4 group-hover:text-amber-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-sans font-semibold rounded-full">
                        {feature.frequency}
                      </div>
                    </div>
                  </AdvancedScrollSection>
                ))}
              </div>
            </div>
          </section>
        </AdvancedScrollSection>
      )}

      {/* Benefits Section */}
      {activeTab === "benefits" && (
        <AdvancedScrollSection direction="left">
          <section className="py-32 px-6 bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Member Benefits</h2>
                <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Join a community designed for real transformation, not just inspiration. Get everything you need to
                  optimize your health and expand your consciousness.
                </p>
              </div>

              <div className="space-y-8">
                {communityBenefits.map((benefit, index) => (
                  <AdvancedScrollSection key={index} direction="right" delay={index * 150}>
                    <div
                      className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:border-amber-600 transition-all duration-500 overflow-hidden"
                      data-magnetic
                    >
                      <div className="p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                          <div className="flex-1">
                            <h3 className="font-sans font-bold text-3xl text-white mb-4">{benefit.title}</h3>
                            <p className="font-sans text-lg text-gray-300 leading-relaxed">{benefit.description}</p>
                          </div>
                          <div className="mt-6 md:mt-0 md:ml-8">
                            <span className="inline-block px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-sans font-semibold">
                              {benefit.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AdvancedScrollSection>
                ))}
              </div>
            </div>
          </section>
        </AdvancedScrollSection>
      )}

      {/* Testimonials Section */}
      {activeTab === "testimonials" && (
        <AdvancedScrollSection direction="fade">
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
                  <AdvancedScrollSection key={index} direction="up" delay={index * 200}>
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
                  </AdvancedScrollSection>
                ))}
              </div>
            </div>
          </section>
        </AdvancedScrollSection>
      )}

      {/* CTA Section */}
      <AdvancedScrollSection direction="scale">
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
      </AdvancedScrollSection>

      {/* Footer */}
      <footer className="py-20 px-6 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <CSLogoEasterEgg className="mx-auto mb-10" />
          <p className="font-sans text-gray-400 mb-6 text-lg">
            Copyright © 2025 Chris Star Enterprises LLC. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full mx-4"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>
        </div>
      </footer>
    </main>
  )
}