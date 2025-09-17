"use client"

import { useState, useEffect } from "react"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { CSLogoEasterEgg } from "@/components/cs-logo-easter-egg"

const videoCategories = [
  {
    id: "journey",
    title: "Spiritual Journey",
    description: "Documenting the path of consciousness expansion and awakening",
    count: 24,
    color: "from-red-500/20 to-red-600/30",
  },
  {
    id: "health",
    title: "Health Optimization",
    description: "Carnivore diet, muscle building, and holistic wellness approaches",
    count: 18,
    color: "from-red-600/20 to-red-700/30",
  },
  {
    id: "shadow",
    title: "Shadow Work",
    description: "Deep integration practices and inner transformation techniques",
    count: 15,
    color: "from-red-500/20 to-red-700/30",
  },
  {
    id: "starseed",
    title: "Starseed Awakening",
    description: "Content for lightworkers and starseeds on their mission",
    count: 12,
    color: "from-red-600/20 to-red-800/30",
  },
]

const featuredVideos = [
  {
    id: "1",
    title: "My Carnivore Journey: 6 Months of Transformation",
    description: "Documenting my complete transformation through the carnivore diet - physical changes, mental clarity, and spiritual insights gained along the way.",
    duration: "18:45",
    views: "15.2K",
    category: "Health Optimization",
    thumbnail: "/youtube-thumbnail-1.png",
    publishDate: "2 weeks ago",
    featured: true,
  },
  {
    id: "2",
    title: "Shadow Work: Integrating Your Dark Side for Spiritual Growth",
    description: "A deep dive into shadow work practices that have transformed my spiritual journey. Real techniques for facing and integrating your shadow aspects.",
    duration: "25:32",
    views: "22.8K",
    category: "Shadow Work",
    thumbnail: "/youtube-thumbnail-2.png",
    publishDate: "1 month ago",
    featured: true,
  },
  {
    id: "3",
    title: "Starseed Awakening: Remembering Your Cosmic Mission",
    description: "For starseeds and lightworkers feeling the call to remember their purpose. Signs, symptoms, and steps to embrace your galactic heritage.",
    duration: "22:18",
    views: "9.7K",
    category: "Starseed Awakening",
    thumbnail: "/youtube-thumbnail-3.png",
    publishDate: "3 weeks ago",
    featured: false,
  },
  {
    id: "4",
    title: "Building Muscle on Carnivore: My Training Protocol",
    description: "How I've built and maintained muscle mass while eating only animal products. Training routines, recovery, and results.",
    duration: "16:24",
    views: "18.5K",
    category: "Health Optimization",
    thumbnail: "/youtube-thumbnail-4.png",
    publishDate: "1 week ago",
    featured: false,
  },
  {
    id: "5",
    title: "Consciousness Expansion: What I've Learned This Year",
    description: "Sharing the biggest insights and breakthroughs from my spiritual journey this year. Raw, honest reflections on growth and awakening.",
    duration: "21:56",
    views: "13.4K",
    category: "Spiritual Journey",
    thumbnail: "/youtube-thumbnail-5.png",
    publishDate: "2 months ago",
    featured: false,
  },
  {
    id: "6",
    title: "The Dark Night of the Soul: My Experience and Guidance",
    description: "Navigating the most challenging phase of spiritual awakening. What to expect, how to cope, and why it's necessary for growth.",
    duration: "28:15",
    views: "25.1K",
    category: "Spiritual Journey",
    thumbnail: "/youtube-thumbnail-6.png",
    publishDate: "6 weeks ago",
    featured: false,
  },
]

export default function YouTubePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const filteredVideos = featuredVideos.filter((video) => {
    return activeCategory === "all" || video.category.toLowerCase().includes(activeCategory)
  })

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
      <ScrollProgressIndicator />
      <MagneticCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-red-900 via-gray-900 to-amber-900 text-white overflow-hidden">
        {/* Layered Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-20 left-10 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-parallax-float"
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
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-red-500 rounded-full blur-2xl"
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
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl animate-luxury-glow mb-8">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
            </div>
            <h1 className="font-sans font-bold text-6xl md:text-8xl mb-8 tracking-tight">Spiritual</h1>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-red-400 mb-12 tracking-tight">Journey</h2>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="up" delay={300}>
            <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16">
              Join me on my authentic spiritual journey through long-form content that documents real transformation.
              From carnivore nutrition and muscle building to shadow work and starseed awakening—this is where I share
              what I've learned, not just what sounds good.
            </p>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-red-400 mb-2">85+</div>
                <p className="font-sans text-sm text-gray-300 uppercase tracking-wider">Spiritual Videos</p>
              </div>
              <div className="w-px h-16 bg-red-400 opacity-30 hidden md:block"></div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-red-400 mb-2">250K+</div>
                <p className="font-sans text-sm text-gray-300 uppercase tracking-wider">Total Views</p>
              </div>
              <div className="w-px h-16 bg-red-400 opacity-30 hidden md:block"></div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-red-400 mb-2">12K+</div>
                <p className="font-sans text-sm text-gray-300 uppercase tracking-wider">Subscribers</p>
              </div>
            </div>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={900}>
            <button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-red-700 transition-colors duration-300 shadow-lg flex items-center space-x-3 mx-auto"
              data-magnetic
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Subscribe to Channel</span>
            </button>
          </AdvancedScrollSection>
        </div>
      </section>

      {/* Categories Section */}
      <AdvancedScrollSection direction="up">
        <section className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-3 rounded-lg font-sans font-semibold transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:text-red-400 hover:bg-gray-600"
                }`}
                data-magnetic
              >
                All Videos
              </button>
              {videoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-sans font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:text-red-400 hover:bg-gray-600"
                  }`}
                  data-magnetic
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Featured Videos */}
      <AdvancedScrollSection direction="stagger">
        <section className="py-32 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Featured Content</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Raw, authentic content documenting my spiritual journey and transformation. No fluff, just real
                experiences and practical insights for fellow seekers on the path.
              </p>
            </div>

            {/* Hero Video */}
            <AdvancedScrollSection direction="scale" delay={200}>
              <div className="mb-16">
                <div
                  className="group relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                  onClick={() => setSelectedVideo(featuredVideos[0].id)}
                  data-magnetic
                >
                  <img
                    src={featuredVideos[0].thumbnail || "/placeholder.svg"}
                    alt={featuredVideos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 shadow-2xl">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-sans font-bold text-3xl text-white mb-2">{featuredVideos[0].title}</h3>
                    <p className="font-sans text-gray-200 leading-relaxed mb-4">{featuredVideos[0].description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span>{featuredVideos[0].views} views</span>
                      <span>•</span>
                      <span>{featuredVideos[0].publishDate}</span>
                      <span>•</span>
                      <span>{featuredVideos[0].duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdvancedScrollSection>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.slice(1).map((video, index) => (
                <AdvancedScrollSection key={video.id} direction="up" delay={index * 150}>
                  <div
                    className="group bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl hover:border-red-600 transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedVideo(video.id)}
                    data-magnetic
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-sans font-semibold rounded-full">
                          {video.category}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-xl text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="font-sans text-gray-300 leading-relaxed mb-4 line-clamp-3">{video.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{video.views} views</span>
                        <span>{video.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Video Categories Overview */}
      <AdvancedScrollSection direction="left">
        <section className="py-32 px-6 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Content Categories</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Organized collections covering different aspects of the spiritual journey—from physical optimization to
                consciousness expansion. Each category represents a core pillar of holistic transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {videoCategories.map((category, index) => (
                <AdvancedScrollSection key={category.id} direction="up" delay={index * 150}>
                  <div
                    className="group bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-red-600 transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => setActiveCategory(category.id)}
                    data-magnetic
                  >
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div className="p-8">
                      <h3 className="font-sans font-bold text-2xl text-white mb-3">{category.title}</h3>
                      <p className="font-sans text-gray-300 leading-relaxed mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm text-red-400 font-semibold">{category.count} Videos</span>
                        <svg
                          className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Subscribe CTA */}
      <AdvancedScrollSection direction="scale">
        <section className="py-32 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79 4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
            <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">Join the Journey</h2>
            <p className="font-sans text-xl leading-relaxed mb-12 opacity-90 max-w-3xl mx-auto">
              Subscribe to follow my authentic spiritual journey and transformation. No fake motivation—just real
              experiences, practical insights, and honest documentation of what it takes to truly change your life.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                className="bg-white text-red-600 px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg flex items-center space-x-3"
                data-magnetic
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>Subscribe Now</span>
              </button>
              <button
                className="border-2 border-white text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
                data-magnetic
              >
                View All Videos
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
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-4"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </div>
      </footer>
    </main>
  )
}