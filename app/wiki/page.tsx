"use client"

import { useState, useEffect } from "react"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { CSLogoEasterEgg } from "@/components/cs-logo-easter-egg"

const wikiProjects = [
  {
    id: "taygetan",
    title: "Taygetan Disclosure Wiki",
    description: "Community-driven knowledge base built from transcript source material",
    status: "Active",
    contributors: 25,
    articles: 150,
    icon: "🌌",
    color: "from-blue-500/20 to-blue-600/30",
    featured: true,
  },
  {
    id: "company",
    title: "Chris Star Enterprises Wiki",
    description: "Internal knowledge base for company processes and methodologies",
    status: "Coming Soon",
    contributors: 5,
    articles: 0,
    icon: "🏢",
    color: "from-amber-500/20 to-amber-600/30",
    featured: false,
  },
]

const wikiFeatures = [
  {
    title: "Community Collaboration",
    description: "Multiple contributors working together to build comprehensive knowledge bases",
    icon: "👥",
  },
  {
    title: "Source Material Based",
    description: "All content derived from verified transcripts and authentic source materials",
    icon: "📚",
  },
  {
    title: "Cross-Referenced Content",
    description: "Interconnected articles with deep linking and relationship mapping",
    icon: "🔗",
  },
  {
    title: "Regular Updates",
    description: "Continuously updated with new information and community contributions",
    icon: "🔄",
  },
]

export default function WikiPage() {
  const [selectedWiki, setSelectedWiki] = useState<string | null>(null)
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

  const handleWikiSelection = (wikiId: string) => {
    setSelectedWiki(wikiId)
    // In a real implementation, this would redirect to wiki.chris-star.com/[wikiId]
    // For now, we'll show a placeholder
    alert(`Redirecting to wiki.chris-star.com/${wikiId}`)
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <ScrollProgressIndicator />
      <MagneticCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-amber-900 text-white overflow-hidden">
        {/* Layered Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-20 left-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl animate-parallax-float"
            style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
          />
          <div
            className="absolute bottom-20 right-10 w-60 h-60 bg-amber-600 rounded-full blur-3xl"
            style={{ 
              animationDelay: "2s",
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-2xl"
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
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl animate-luxury-glow mb-8">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>
            <h1 className="font-sans font-bold text-6xl md:text-8xl mb-8 tracking-tight">Community</h1>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-blue-400 mb-12 tracking-tight">Wiki Hub</h2>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="up" delay={300}>
            <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Welcome to our community-driven wiki projects. These collaborative knowledge bases are built from
              transcript source materials and maintained by dedicated contributors who believe in preserving and
              organizing important information.
            </p>
            <p className="font-sans font-light text-lg text-blue-300 max-w-3xl mx-auto leading-relaxed mb-16">
              Each wiki is a specialized project focusing on different topics, all hosted on our custom wiki platform
              with advanced features for cross-referencing and community collaboration.
            </p>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                data-magnetic
              >
                Explore Wikis
              </button>
              <button
                className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300"
                data-magnetic
              >
                Contribute
              </button>
            </div>
          </AdvancedScrollSection>
        </div>
      </section>

      {/* Wiki Selection Interface */}
      <AdvancedScrollSection direction="up">
        <section className="py-32 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Select a Wiki</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Choose from our available community wiki projects. Each wiki is a specialized knowledge base with its
                own focus and contributor community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {wikiProjects.map((wiki, index) => (
                <AdvancedScrollSection key={wiki.id} direction={index % 2 === 0 ? "left" : "right"} delay={index * 200}>
                  <div
                    className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 cursor-pointer transform hover:scale-105 ${
                      wiki.featured ? "ring-2 ring-blue-400" : ""
                    }`}
                    onClick={() => handleWikiSelection(wiki.id)}
                    data-magnetic
                  >
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${wiki.color} opacity-90`}>
                      <div className="absolute inset-0 bg-black/20" />
                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
                      <div className="absolute bottom-8 left-8 w-8 h-8 bg-white/20 rounded-full animate-bounce" />
                      <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/15 rounded-full animate-ping" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-12 text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-6 animate-float">{wiki.icon}</div>
                        <h3 className="font-sans font-bold text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {wiki.title}
                        </h3>
                        <p className="font-sans text-lg text-white/90 leading-relaxed mb-8">{wiki.description}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center">
                            <div className="text-2xl font-sans font-bold">{wiki.contributors}</div>
                            <div className="text-sm text-white/70">Contributors</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-sans font-bold">{wiki.articles}</div>
                            <div className="text-sm text-white/70">Articles</div>
                          </div>
                          <div className="text-center">
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-sm font-sans font-semibold ${
                                wiki.status === "Active" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                              }`}
                            >
                              {wiki.status}
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-sans font-bold hover:bg-white/30 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleWikiSelection(wiki.id)
                          }}
                        >
                          {wiki.status === "Active" ? "Enter Wiki" : "Coming Soon"}
                        </button>

                        {wiki.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-sans font-semibold rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Wiki Features */}
      <AdvancedScrollSection direction="stagger">
        <section className="py-32 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Wiki Features</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our community wikis are built with advanced features to support collaborative knowledge building and
                easy information discovery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wikiFeatures.map((feature, index) => (
                <AdvancedScrollSection key={index} direction="up" delay={index * 150}>
                  <div
                    className="group bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-600 transition-all duration-500 p-8"
                    data-magnetic
                  >
                    <div className="text-5xl mb-6 text-center">{feature.icon}</div>
                    <h3 className="font-sans font-bold text-xl text-white mb-4 text-center group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-gray-300 leading-relaxed text-center">{feature.description}</p>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Community Contribution CTA */}
      <AdvancedScrollSection direction="scale">
        <section className="py-32 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2.5c0-1.1.9-2 2-2h2V8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v1.5h2c1.1 0 2 .9 2 2V14h2v4H4z" />
                </svg>
              </div>
            </div>
            <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">Join the Community</h2>
            <p className="font-sans text-xl leading-relaxed mb-12 opacity-90 max-w-3xl mx-auto">
              Help build and maintain these important knowledge bases. Whether you're contributing content, editing
              articles, or organizing information, every contribution helps preserve valuable knowledge for future
              generations.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                className="bg-white text-blue-600 px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                data-magnetic
              >
                Become a Contributor
              </button>
              <button
                className="border-2 border-white text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
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
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            <div className="w-2 h-2 bg-blue-600 rounded-full mx-4" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}