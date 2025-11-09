"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/layout/Footer"
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
                        className="group bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 cursor-pointer transform hover:scale-105"
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
                            
                            {/* Real YouTube play button and duration */}
                            <div className="relative z-10 text-center text-white/90">
                              <div className="w-20 h-12 bg-black/70 rounded flex items-center justify-center mx-auto mb-3 group-hover:bg-black/80 transition-colors duration-300">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-sans bg-black/50 px-2 py-1 rounded">{video.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-semibold text-lg text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                          <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-sans font-semibold hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span>Watch Now</span>
                          </button>
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