"use client"

import { Canvas } from '@react-three/fiber'
import { OrganicEarth } from '@/components/OrganicEarth'
import { EarthBriefingOverlay } from '@/components/EarthBriefingOverlay'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavigationPage() {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false)
  const [isEarthZoomed, setIsEarthZoomed] = useState(false)

  // Listen for the Earth click event to open briefing AND zoom
  useEffect(() => {
    const handleEarthClick = () => {
      setIsBriefingOpen(true)
      setIsEarthZoomed(true)
    }
    
    window.addEventListener('earthBriefingOpen', handleEarthClick)
    return () => window.removeEventListener('earthBriefingOpen', handleEarthClick)
  }, [])

  const handleCloseBriefing = () => {
    setIsBriefingOpen(false)
    setIsEarthZoomed(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Overlay */}
      <EarthBriefingOverlay 
        isOpen={isBriefingOpen} 
        onClose={handleCloseBriefing}
        isEarthZoomed={isEarthZoomed}
      />
      
      {/* Top Center Logo - Clickable to Homepage */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <Link href="/" className="block hover:opacity-80 transition-opacity">
          <Image
            src="/Icon.png"
            alt="CSE"
            width={75}
            height={75}
            className="drop-shadow-lg"
          />
        </Link>
      </div>

      {/* Main Layout - Earth takes center stage */}
      <div className="grid grid-cols-12 h-screen p-8 gap-8 pt-20">
        {/* Left - Ship Systems */}
        <div className="col-span-2 z-10 flex flex-col justify-center">
          <div className="text-lg mb-4 opacity-80">SHIP SYSTEMS</div>
          <div className='opacity-70'>Star Chart: 91048j27351a6088b39</div>
          <div className='opacity-70'>Coordinates: LOCKED</div>
          <div className='opacity-70'>Jump Status: IMMINENT</div>
          <div className='opacity-70'>Alert Level: RED</div>
        </div>

        {/* Center - Full Screen Earth */}
        <div className="col-span-8 relative -m-8 flex items-center justify-center">
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, isEarthZoomed ? 1.5 : 3.1], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <OrganicEarth isZoomed={isEarthZoomed} />
            </Canvas>
          </div>

          {/* Click to Brief Text - Only show when not zoomed */}
          {!isEarthZoomed && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-base tracking-[0.3em] opacity-80 font-light">
              CLICK TO BRIEF
            </div>
          )}
        </div>

        {/* Right - Ship Decks */}
        <div className="col-span-2 z-10 flex flex-col justify-center">
          <div className="text-lg mb-4 opacity-80">SHIP DECKS</div>
          <div className="opacity-70">Bridge</div>
          <div className="text-blue-400 opacity-90">▶ Navigation</div>
          <div className="opacity-70">The Archives</div>
          <div className="opacity-70">Personal Quarters</div>
        </div>
      </div>
    </div>
  )
}