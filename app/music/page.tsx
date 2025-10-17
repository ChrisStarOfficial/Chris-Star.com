"use client"

import { useState, useRef, useEffect } from "react"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { CSLogoEasterEgg } from "@/components/cs-logo-easter-egg"

const spiritualSongs = [
  {
    id: "awakening",
    title: "Spiritual Awakening",
    description: "Songs exploring the journey of consciousness expansion and spiritual growth.",
    duration: "12 songs",
    mood: "Awakening",
    color: "from-amber-500/20 to-amber-600/30",
    topics: ["Consciousness", "Awakening", "Light"],
  },
  {
    id: "shadow",
    title: "Shadow Integration",
    description: "Deep tracks about facing and integrating our shadow aspects for wholeness.",
    duration: "8 songs",
    mood: "Transformative",
    color: "from-amber-600/20 to-amber-700/30",
    topics: ["Shadow Work", "Integration", "Healing"],
  },
  {
    id: "starseed",
    title: "Starseed Journey",
    description: "Music for starseeds and lightworkers on their mission of service and remembrance.",
    duration: "15 songs",
    mood: "Cosmic",
    color: "from-amber-500/20 to-amber-700/30",
    topics: ["Starseed", "Mission", "Service"],
  },
  {
    id: "ascension",
    title: "Ascension Path",
    description: "Uplifting songs about the ascension process and raising our vibration.",
    duration: "10 songs",
    mood: "Elevating",
    color: "from-amber-600/20 to-amber-800/30",
    topics: ["Ascension", "Vibration", "Evolution"],
  },
]

const featuredTracks = [
  {
    title: "Light Within the Shadow",
    artist: "Chris Star",
    duration: "4:32",
    album: "Shadow Integration",
    topic: "Shadow Work",
  },
  {
    title: "Starseed Remembrance",
    artist: "Chris Star",
    duration: "6:18",
    album: "Starseed Journey",
    topic: "Awakening",
  },
  {
    title: "The Ascension Call",
    artist: "Chris Star",
    duration: "3:45",
    album: "Ascension Path",
    topic: "Spiritual Growth",
  },
  {
    title: "Consciousness Rising",
    artist: "Chris Star",
    duration: "5:12",
    album: "Spiritual Awakening",
    topic: "Consciousness",
  },
]

export default function MusicPage() {
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
  }

  return (
    <main className="min-h-screen bg-gray-900">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-amber-900 via-gray-900 to-amber-800 text-white overflow-hidden">
        {/* Layered Background Effects */}
        <div className="absolute inset-0 opacity-30">
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

        {/* Animated Sound Waves */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="flex space-x-2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                }}
              />
            ))}
          </div>
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
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-2xl animate-luxury-glow mb-8">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            </div>
            <h1 className="font-sans font-bold text-6xl md:text-8xl mb-8 tracking-tight">Spiritual</h1>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-amber-400 mb-12 tracking-tight">
              Soundscapes
            </h2>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="up" delay={300}>
            <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              A side passion of mine is creating spiritual music that speaks to the soul. Through AI-assisted
              composition on Suno AI, I craft songs that explore consciousness, shadow work, starseed awakening, and the
              ascension journey.
            </p>
            <p className="font-sans font-light text-lg text-amber-300 max-w-3xl mx-auto leading-relaxed mb-16">
              Each song is designed to support your spiritual journey, whether you're integrating shadow aspects,
              awakening to your starseed mission, or simply seeking music that resonates with your higher self.
            </p>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <button
                onClick={handlePlayPause}
                className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg flex items-center space-x-3"
                data-magnetic
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
                </svg>
                <span>{isPlaying ? "Pause" : "Play"} Collection</span>
              </button>
              <a
                href="https://suno.com/@neo5599"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                data-magnetic
              >
                Visit Suno AI Profile
              </a>
            </div>
          </AdvancedScrollSection>
        </div>
      </section>

      {/* Spiritual Songs Section */}
      <AdvancedScrollSection direction="stagger">
        <section className="py-32 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Spiritual Collections</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Thoughtfully crafted musical journeys exploring different aspects of spiritual awakening and
                consciousness expansion. Each collection addresses specific themes relevant to lightworkers, starseeds,
                and spiritual seekers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {spiritualSongs.map((collection, index) => (
                <AdvancedScrollSection
                  key={collection.id}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 200}
                >
                  <div
                    className="group bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => setCurrentPlaylist(collection.id)}
                    data-magnetic
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${collection.color} flex items-center justify-center`}
                      >
                        <div className="text-center text-white">
                          <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <h3 className="font-sans font-bold text-2xl">{collection.title}</h3>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlayPause()
                          }}
                        >
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-sans font-bold text-2xl text-white group-hover:text-amber-400 transition-colors">
                          {collection.title}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-sans font-semibold rounded-full">
                          {collection.mood}
                        </span>
                      </div>
                      <p className="font-sans text-gray-300 leading-relaxed mb-4">{collection.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {collection.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700 text-amber-300 text-xs font-sans rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="font-sans">{collection.duration}</span>
                        <span className="font-sans">Spiritual Journey</span>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Featured Tracks */}
      <AdvancedScrollSection direction="up">
        <section className="py-32 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Featured Spiritual Tracks</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover standout compositions from my spiritual music collection. Each track explores relevant
                spiritual topics and is crafted to support your journey of consciousness expansion and inner
                transformation.
              </p>
            </div>

            <div className="space-y-6">
              {featuredTracks.map((track, index) => (
                <AdvancedScrollSection key={index} direction="fade" delay={index * 100}>
                  <div
                    className="group bg-gray-900 border border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-amber-600 transition-all duration-300 p-6 cursor-pointer"
                    onClick={() => handleTrackSelect(index)}
                    data-magnetic
                  >
                    <div className="flex items-center space-x-6">
                      <button
                        className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTrackSelect(index)
                        }}
                      >
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          {currentTrack === index && isPlaying ? (
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          ) : (
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-sans font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                              {track.title}
                            </h3>
                            <p className="font-sans text-gray-300">{track.artist}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-sm text-gray-400">{track.duration}</p>
                            <p className="font-sans text-xs text-amber-400">{track.topic}</p>
                          </div>
                        </div>

                        {/* Waveform Visualization */}
                        <div className="flex items-center space-x-1 h-8">
                          {[...Array(40)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-full transition-all duration-300 ${
                                currentTrack === index && isPlaying
                                  ? "bg-amber-600 animate-pulse"
                                  : "bg-gray-600 group-hover:bg-amber-400"
                              }`}
                              style={{
                                height: `${Math.random() * 20 + 8}px`,
                                animationDelay: `${i * 0.05}s`,
                              }}
                            />
                          ))}
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

      {/* Music Player Interface */}
      <AdvancedScrollSection direction="scale">
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-amber-900 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-2">
                    {currentTrack !== null ? featuredTracks[currentTrack].title : "Select a Track"}
                  </h3>
                  <p className="font-sans text-amber-400">
                    {currentTrack !== null ? featuredTracks[currentTrack].artist : "Spiritual Music Collection"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-300"
                    data-magnetic
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-300"
                    data-magnetic
                  >
                    <svg className="w-8 h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
                    </svg>
                  </button>
                  <button
                    className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-300"
                    data-magnetic
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? "45%" : "0%" }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>1:23</span>
                  <span>{currentTrack !== null ? featuredTracks[currentTrack].duration : "0:00"}</span>
                </div>
              </div>

              {/* Volume and Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                  <div className="w-24 h-1 bg-gray-700 rounded-full">
                    <div className="w-16 h-full bg-amber-600 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-white transition-colors" data-magnetic>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                  <a
                    href="https://suno.com/@neo5599"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                    data-magnetic
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </a>
                </div>
              </div>
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
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            <div className="w-2 h-2 bg-amber-600 rounded-full mx-4" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          </div>
        </div>
      </footer>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </main>
  )
}