"use client"

import { Canvas } from '@react-three/fiber'
import { TexturedEarth } from '@/components/TexturedEarth'
import { EarthBriefingOverlay } from '@/components/EarthBriefingOverlay'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavigationPage() {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false)
  const [isEarthZoomed, setIsEarthZoomed] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Overlay */}
      <EarthBriefingOverlay 
        isOpen={isBriefingOpen} 
        onClose={handleCloseBriefing}
        isEarthZoomed={isEarthZoomed}
      />
      
      {/* Glassmorphism Navbar Header - FIXED LOGO + COLORED DOTS */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl p-2">
          <div className="flex items-center justify-between">
            {/* Logo - Fixed position on left */}
            <Link href="/" className="block hover:opacity-80 transition-opacity ml-4">
              <Image
                src="/Icon.png"
                alt="CSE"
                width={32}
                height={32}
                className="drop-shadow-lg"
              />
            </Link>
            
            {/* Text with colored dots - Full width grid */}
            <div className="flex-1 grid grid-cols-3 items-center text-base text-white"> {/* White text */}
              {/* First text with green dot */}
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                <span>Jump Drive Ready</span>
              </div>
              
              {/* Second text with blue dot */}
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }}></div>
                <span>Frequency Map Located</span>
              </div>
              
              {/* Third text with yellow dot */}
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                <span>Enter Star Chart Coordinates</span>
              </div>
            </div>

            {/* Right spacer for balance */}
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      {/* Main Layout - Adjusted top padding for navbar */}
      <div className="grid grid-cols-12 h-screen p-8 gap-8 pt-28"> {/* Increased pt-20 to pt-28 */}
        {/* Left - Ship Systems */}
        <div className="col-span-2 z-10 flex flex-col justify-center">
          <div className="text-lg mb-4 opacity-90">SHIP SYSTEMS</div>
          <div className='opacity-80'>Star Chart: 91048j27351a6088b39</div>
          <div className='opacity-80'>Coordinates: LOCKED</div>
          <div className='opacity-80'>Jump Status: IMMINENT</div>
          <div className='opacity-80'>Alert Level: RED</div>
        </div>

        {/* Center - Full Screen Earth */}
        <div className="col-span-8 relative -m-8 flex items-center justify-center">
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, isEarthZoomed ? 1.5 : 3.1], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <TexturedEarth isZoomed={isEarthZoomed} />
            </Canvas>
          </div>

          {/* Click to Brief Text */}
          {!isEarthZoomed && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-base tracking-[0.3em] opacity-80 font-light">
              CLICK TO BRIEF
            </div>
          )}
        </div>

        {/* Right - Ship Decks */}
        <div className="col-span-2 z-10 flex flex-col justify-center">
          <div className="text-lg mb-4 opacity-90">SHIP DECKS</div>
          <div className="opacity-80">Bridge</div>
          <div className="text-blue-300 opacity-90">▶ Navigation</div>
          <div className="opacity-80">The Archives</div>
          <div className="opacity-80">Personal Quarters</div>
        </div>
      </div>
    </div>
  )
}