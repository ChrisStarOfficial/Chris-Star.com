"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ScrollSection } from "@/components/layout/scroll-section"
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos"

export default function SpiritualHomepage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { videos, loading, error } = useYouTubeVideos()

  // Handle mouse movement for subtle parallax
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
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

      {/* Latest YouTube Videos - FULLSCREEN */}
      <section className="h-screen flex items-center justify-center px-6 bg-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <ScrollSection direction="fade">
            <div className="text-center mb-16">
              <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
                Latest Free Content
              </h2>
              <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Fresh spiritual guidance and practices to support your journey
              </p>
            </div>
          </ScrollSection>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-video bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-700 rounded mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Show error message as a gentle notification, not blocking content */}
              {error && (
                <div className="text-center mb-8">
                  <div className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 px-6 py-3 rounded-lg">
                    {error}
                  </div>
                </div>
              )}
              
              {/* Always show videos if we have them, regardless of error state */}
              {videos.length > 0 && (
                <ScrollSection direction="up" delay={200}>
                  <div className="grid md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                      <div 
                        key={video.id}
                        className="group bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-amber-600 transition-all duration-500 cursor-pointer transform hover:scale-105"
                        onClick={() => window.open(video.url, '_blank')}
                        data-magnetic
                      >
                        <div className="relative aspect-video bg-gray-700 overflow-hidden">
                          {/* Video thumbnail with sample image */}
                          <div className="w-full h-full bg-gradient-to-br from-amber-900/40 to-purple-900/40 flex items-center justify-center relative">
                            {video.thumbnail && !video.thumbnail.includes('placeholder') ? (
                              // If we have a real thumbnail, use it
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover absolute inset-0"
                              />
                            ) : (
                            // Otherwise use a clean gradient based on content type
                            <div className={`absolute inset-0 opacity-60 ${
                              video.title.includes('Shadow') ? 'bg-gradient-to-br from-gray-900 to-amber-900' :
                              video.title.includes('Starseed') ? 'bg-gradient-to-br from-blue-900 to-purple-900' :
                              video.title.includes('Health') ? 'bg-gradient-to-br from-green-900 to-amber-900' :
                              'bg-gradient-to-br from-amber-900 to-rose-900'
                            }`} />
                            )}
                            <div className="absolute inset-0 bg-black/40" />
                            
                            {/* YouTube play button - centered and larger */}
                            <div className="relative z-10 text-center text-white/90">
                              <svg className="w-16 h-14 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 68 48">
                                <path fill="#f71c47" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"/>
                                <path fill="white" d="M45,24L27,14v20L45,24z"/>
                              </svg>
                            </div>

                            {/* Duration timestamp - bottom right corner */}
                            <div className="absolute bottom-2 right-2 z-10">
                              <span className="text-sm font-sans text-white px-1 py-0.5 rounded" style={{ backgroundColor: '#202124' }}>
                                {video.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 text-center">
                          <h3 className="font-sans font-semibold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollSection>
              )}
              
              {/* Fallback in case videos array is empty (shouldn't happen with our logic) */}
              {videos.length === 0 && !loading && (
                <div className="text-center text-amber-400">
                  <p>Content coming soon! Check back later for new videos.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* The Next Step Section */}
      <ScrollSection direction="up">
        <section className="py-20 px-6 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollSection direction="fade">
              <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-8 tracking-tight">
                Ready to Go Deeper?
              </h2>
            </ScrollSection>

            <ScrollSection direction="up" delay={200}>
              <p className="font-sans text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                While YouTube gives you wisdom, our community gives you transformation. Move beyond one-way content and into personalized guidance, live interaction, and a supportive spiritual tribe.
              </p>
            </ScrollSection>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: "💬",
                  title: "Weekly Live Q&As with Chris",
                  description: "Get your personal questions answered in real-time"
                },
                {
                  icon: "👥", 
                  title: "Private Community of Like-Minded Souls",
                  description: "Connect with others on the same spiritual path"
                },
                {
                  icon: "🧘",
                  title: "Exclusive Meditations & Practices",
                  description: "Access guided sessions not available anywhere else"
                },
                {
                  icon: "⚡",
                  title: "Monthly Growth Challenges",
                  description: "Practical exercises to integrate spiritual wisdom"
                }
              ].map((feature, index) => (
                <ScrollSection key={index} direction="up" delay={300 + (index * 100)}>
                  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left hover:border-amber-600 transition-all duration-500">
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="font-sans font-semibold text-xl text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollSection>
              ))}
            </div>

            <ScrollSection direction="scale" delay={600}>
              <a
                href="/community"
                className="inline-block bg-amber-600 text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                data-magnetic
              >
                Join the Community →
              </a>
            </ScrollSection>
          </div>
        </section>
      </ScrollSection>

      {/* Footer */}
      <Footer />
    </main>
  )
}