"use client"
import { useRef, useState, useEffect } from 'react'
import { DestinationInfoPanel } from './DestinationInfoPanel'
import { DestinationOrbits } from './DestinationOrbits'
import { NavigationControls } from './NavigationControls'

interface Destination {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  position: { x: number; y: number; z: number }
  color: string
  borderColor: string
  glowColor: string
}

interface NavigationSectionProps {
  showNavigation: boolean
  selectedDestination: string | null
  mousePosition: { x: number; y: number }
  onDestinationSelect: (id: string) => void
  onDestinationDeselect: () => void
}

export const NavigationSection = ({
  showNavigation,
  selectedDestination,
  mousePosition,
  onDestinationSelect,
  onDestinationDeselect
}: NavigationSectionProps) => {
  const navigationRef = useRef<HTMLDivElement>(null)
  const [cameraAngle, setCameraAngle] = useState(0)
  const [satellitesVisible, setSatellitesVisible] = useState(false)
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null)

  const destinations: Destination[] = [
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

  // Handle scroll for camera rotation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const navigationTop = navigationRef.current?.offsetTop || 0
      const navigationHeight = navigationRef.current?.offsetHeight || 0
      const scrollProgress = Math.max(0, Math.min(1, (scrollY - navigationTop + window.innerHeight) / navigationHeight))
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        setCameraAngle(scrollProgress * 360)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const selectedDestinationData = destinations.find(d => d.id === selectedDestination)

  return (
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

      {/* 3D Navigation System */}
      <DestinationOrbits
        destinations={destinations}
        cameraAngle={cameraAngle}
        mousePosition={mousePosition}
        satellitesVisible={satellitesVisible}
        onDestinationHover={setHoveredDestination}
        onDestinationSelect={onDestinationSelect}
        onSatellitesToggle={setSatellitesVisible} // Add this
      />

      {/* Navigation UI Controls */}
      <NavigationControls
        selectedDestination={selectedDestination}
        destinations={destinations}
        onDestinationSelect={onDestinationSelect}
        onClearSelection={onDestinationDeselect}
      />

      {/* Destination Info Panel */}
      {selectedDestination && (
        <DestinationInfoPanel
          destination={selectedDestinationData}
          onSelect={() => selectedDestination && onDestinationSelect(selectedDestination)}
          onClose={onDestinationDeselect}
        />
      )}

      {/* Hover Tooltip */}
      {hoveredDestination && !selectedDestination && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
            <div className="text-sm font-light">
              {destinations.find(d => d.id === hoveredDestination)?.title}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}