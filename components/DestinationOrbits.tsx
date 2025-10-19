"use client"
import { useState } from 'react'

interface Destination {
  id: string
  title: string
  subtitle: string
  position: { x: number; y: number; z: number }
  color: string
  borderColor: string
  glowColor: string
}

interface DestinationOrbitsProps {
  destinations: Destination[]
  cameraAngle: number
  mousePosition: { x: number; y: number }
  satellitesVisible: boolean
  onDestinationHover: (id: string | null) => void
  onDestinationSelect: (id: string) => void
  onSatellitesToggle: (visible: boolean) => void
}

export const DestinationOrbits = ({
  destinations,
  cameraAngle,
  mousePosition,
  satellitesVisible,
  onDestinationHover,
  onDestinationSelect,
  onSatellitesToggle
}: DestinationOrbitsProps) => {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null)

  const handleMouseEnter = (id: string) => {
    setHoveredDestination(id)
    onDestinationHover(id)
  }

  const handleMouseLeave = () => {
    setHoveredDestination(null)
    onDestinationHover(null)
  }

  return (
    <div className="absolute inset-0" style={{ transform: `rotateY(${cameraAngle}deg)` }}>
      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 border border-white/10 rounded-full" />
        <div className="w-64 h-64 border border-white/10 rounded-full" />
        <div className="w-32 h-32 border border-white/20 rounded-full" />
      </div>

      {/* Destination satellites */}
      {destinations.map((destination) => (
        <div
          key={destination.id}
          id={`destination-${destination.id}`}
          className={`absolute w-16 h-16 rounded-full border-2 backdrop-blur-sm transition-all duration-500 cursor-pointer
            ${destination.borderColor} ${destination.glowColor} 
            ${hoveredDestination === destination.id ? 'scale-125 shadow-lg' : 'scale-100'}
            ${satellitesVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: `calc(50% + ${destination.position.x}px)`,
            top: `calc(50% + ${destination.position.y}px)`,
            transform: `translate(-50%, -50%) translateZ(${destination.position.z}px)`,
            background: `linear-gradient(135deg, ${destination.color})`,
            boxShadow: hoveredDestination === destination.id ? `0 0 30px ${destination.glowColor}` : 'none',
          }}
          onMouseEnter={() => handleMouseEnter(destination.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onDestinationSelect(destination.id)}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-light tracking-wider">
            {destination.title}
          </div>
        </div>
      ))}

      {/* Central Earth Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-400 rounded-full shadow-2xl cursor-pointer"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
          onMouseEnter={() => onSatellitesToggle(true)}
          onMouseLeave={() => onSatellitesToggle(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
            EARTH
          </div>
        </div>
      </div>
    </div>
  )
}