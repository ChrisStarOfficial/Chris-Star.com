"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { Footer } from "@/components/footer"
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [isHyperspace, setIsHyperspace] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [satellitesVisible, setSatellitesVisible] = useState(false)
  const [cameraAngle, setCameraAngle] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [loadingProgress, setLoadingProgress] = useState(0)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)
  const earthRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const destinations = [
    {
      id: "youtube",
      title: "YouTube",
      subtitle: "Spiritual Journey",
      description: "Long-form authentic content exploring consciousness, transformation, and spiritual awakening",
      href: "/youtube",
      position: { x: -200, y: -100, z: 50 },
      color: "from-red-500/20 to-red-600/30",
      borderColor: "border-red-500/40",
      glowColor: "shadow-red-500/20",
    },
    {
      id: "community",
      title: "Community",
      subtitle: "Skool Platform",
      description: "Join our transformational community with weekly calls, courses, and spiritual guidance",
      href: "/community",
      position: { x: 200, y: -100, z: 50 },
      color: "from-amber-500/20 to-amber-600/30",
      borderColor: "border-amber-500/40",
      glowColor: "shadow-amber-500/20",
    },
    {
      id: "vault",
      title: "Vault",
      subtitle: "Taygetan Archive",
      description: "Comprehensive Obsidian vault of transcribed Taygetan disclosure materials and insights",
      href: "/vault",
      position: { x: 0, y: 200, z: 50 },
      color: "from-purple-500/20 to-purple-600/30",
      borderColor: "border-purple-500/40",
      glowColor: "shadow-purple-500/20",
    },
    {
      id: "wiki",
      title: "Wiki",
      subtitle: "Knowledge Base",
      description: "Community-driven wiki project with comprehensive spiritual and consciousness resources",
      href: "/wiki",
      position: { x: -150, y: 150, z: 50 },
      color: "from-blue-500/20 to-blue-600/30",
      borderColor: "border-blue-500/40",
      glowColor: "shadow-blue-500/20",
    },
    {
      id: "music",
      title: "Music",
      subtitle: "Suno AI Creations",
      description: "AI-generated spiritual songs and compositions for meditation, healing, and transformation",
      href: "/music",
      position: { x: 150, y: 150, z: 50 },
      color: "from-green-500/20 to-green-600/30",
      borderColor: "border-green-500/40",
      glowColor: "shadow-green-500/20",
    },
  ]

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Play sound effects
  const playSound = (type: 'click' | 'hyperspace' | 'ambient') => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case 'click':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
        break
      case 'hyperspace':
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 2)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 2)
        break
      case 'ambient':
        oscillator.frequency.setValueAtTime(120, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
        break
    }
  }

  // Handle destination selection
  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId)
    playSound('click')
    
    // Flash effect
    const element = document.getElementById(`destination-${destinationId}`)
    if (element) {
      element.style.animation = 'flash 0.3s ease-in-out 3'
    }
    
    // Start hyperspace after delay
    setTimeout(() => {
      setIsHyperspace(true)
      playSound('hyperspace')
      
      // Start loading after hyperspace
      setTimeout(() => {
        setIsHyperspace(false)
        setIsLoading(true)
        
        // Simulate loading progress
        let progress = 0
        const loadingInterval = setInterval(() => {
          progress += Math.random() * 15
          setLoadingProgress(Math.min(progress, 100))
          
          if (progress >= 100) {
            clearInterval(loadingInterval)
            const destination = destinations.find(d => d.id === destinationId)
            if (destination) {
              router.push(destination.href)
            }
          }
        }, 100)
      }, 2000)
    }, 2000)
  }

  // Handle mouse movement for parallax
  const handleMouseMove = (e: MouseEvent) => {
    const rect = navigationRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }
  }

  // Handle scroll for camera rotation
  const handleScroll = () => {
    const scrollY = window.scrollY
    setScrollY(scrollY)
    
    // Calculate camera angle based on scroll position
    const navigationTop = navigationRef.current?.offsetTop || 0
    const navigationHeight = navigationRef.current?.offsetHeight || 0
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - navigationTop + window.innerHeight) / navigationHeight))
    
    if (scrollProgress > 0 && scrollProgress < 1) {
      setCameraAngle(scrollProgress * 360)
      setShowNavigation(true)
    } else if (scrollProgress >= 1) {
      setShowNavigation(true)
    } else {
      setShowNavigation(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Hyperspace effect
  if (isHyperspace) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          {/* Hyperspace tunnel effect */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-900/40 to-black">
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animation: `hyperspace-tunnel ${2 + Math.random() * 2}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-2xl font-light tracking-widest animate-pulse">
              JUMPING TO DESTINATION
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Background geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rotate-12 animate-spin-reverse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rotate-45 animate-pulse" />
          </div>
          
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-white text-lg font-light tracking-widest mb-8">
              RENDERING LOCATION
            </div>
            <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-20 left-10 w-32 h-32 bg-amber-600 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.3}px) translateX(${scrollY * -0.1}px)` }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-amber-400 rounded-full blur-2xl"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }}
          />
        </div>

        <div
          ref={heroRef}
          className={`text-center relative z-10 transition-all duration-1500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div
              className="h-20 mx-auto bg-gradient-to-br from-white-600 to-white-700 rounded-xl flex items-center justify-center shadow-2xl animate-luxury-glow w-[120px]"
              data-magnetic
            >
              <Image
                  src="/Icon.png"
                  alt="CSE"
                  width={100}
                  height={100}
              />
            </div>
          </div>

          <h1
            className={`font-serif font-bold text-9xl text-white mb-0 tracking-h1 transition-all duration-1500 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              lineHeight: "1.1",
            }}
          >
            Chris Star
          </h1>

          <h2
            className={`font-sans font-bold text-5xl text-white mb-24 tracking-h2 transition-all duration-1500 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              lineHeight: "1.1",
            }}
          >
            ENTERPRISES
          </h2>

          <p
            className={`font-sans font-light text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 transition-all duration-1500 delay-900 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Where optimization meets transformation.
          </p>
        </div>
      </section>

      {/* Navigation Section */}
      <section
        ref={navigationRef}
        className="relative w-full h-screen"
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          perspective: "1000px",
          overflow: "hidden",
        }}
      >
        {/* Layered Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Static grid */}
          <div 
            className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            }}
          />
          
          {/* Moving geometric patterns */}
          <div 
            className="absolute inset-0 opacity-10"
                  style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
                radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: "100px 100px",
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          />
          
          {/* Particle system */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
              }}
            />
          ))}
          </div>

        {/* Central Earth Hub (Three.js Canvas) */}
        <div className="absolute inset-0 flex items-center justify-center">
        </div>

        {/* Navigation UI */}
        <div className="absolute top-8 left-8 text-white">
          <div className="text-sm font-light tracking-widest opacity-80">
            NAVIGATION SEGMENT ACTIVE
                </div>
          <div className="text-xs font-light tracking-wider opacity-60 mt-1">
            JUMP DRIVE READY
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <div className="text-sm font-light tracking-widest opacity-80 mb-2">
            SELECT DESTINATION
                </div>
          <div className="text-xs font-light tracking-wider opacity-60">
            Scroll to rotate view • Hover Earth to activate satellites
              </div>
                </div>

        {/* Destination Info Panel */}
        {selectedDestination && (
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white max-w-sm">
            <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-light tracking-wide mb-2">
                {destinations.find(d => d.id === selectedDestination)?.title}
              </h3>
              <p className="text-sm font-light tracking-wider opacity-80 mb-4">
                {destinations.find(d => d.id === selectedDestination)?.subtitle}
              </p>
              <p className="text-xs font-light leading-relaxed opacity-70 mb-6">
                {destinations.find(d => d.id === selectedDestination)?.description}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDestinationSelect(selectedDestination)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/40 rounded transition-all duration-300"
                />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="w-12 h-12 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded transition-all duration-300"
                />
              </div>
            </div>
        </div>
        )}
      </section>

      {/* Transformational Leadership Section */}
      <section className="py-32 px-6 bg-gray-900 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AdvancedScrollSection direction="fade" threshold={0.3}>
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">
                Transformational Leadership
              </h2>
              <h3 className="font-sans font-semibold text-2xl text-amber-400 mb-6 tracking-wide">
                Not just content creation.
              </h3>
              <p className="font-sans text-xl text-gray-400 leading-relaxed text-lg">
                As a public speaker, coach, and guide, I lead with real change—not just inspiration. Starseeds, lightworkers, and spiritual people alike: If you're ready to optimize your health, master your shadows, and become the best version of yourself—your journey starts here. You belong with us.
              </p>
            </div>
          </AdvancedScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Spiritual Leadership",
                desc: "Guiding starseeds, lightworkers, and spiritual people through massive transformation, with practical wisdom and spiritual depth.",
                icon: "👑🛡️",
              },
              {
                title: "Health Optimization",
                desc: "Proper education and implementation in all areas of diet, nutrition, muscle building, circadian rhythm and other health optimizations and strategies, for peak physical, mental, and spiritual performance, to get the most out of life.",
                icon: "⚡💪",
              },
              {
                title: "Shadow Integration",
                desc: "Deep, integrative shadow work and inner transformation creates a permanent, long-term, lasting change—not fleeting motivation or a temporary adaptation.",
                icon: "🧩👤",
              },
            ].map((service, index) => (
              <AdvancedScrollSection key={index} direction="up" delay={index * 200} threshold={0.4}>
                <div className="group h-full" data-magnetic>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 lg:p-10 hover:border-amber-600 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                    <div className="text-4xl mb-6 flex-shrink-0">{service.icon}</div>
                    <h3 className="font-sans font-semibold text-2xl mb-6 text-white group-hover:text-amber-600 transition-colors flex-shrink-0">
                      {service.title}
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed text-lg flex-grow">{service.desc}</p>
                  </div>
                </div>
              </AdvancedScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER COMPONENT INJECTION */}
      <Footer />
    </main>
  )
}