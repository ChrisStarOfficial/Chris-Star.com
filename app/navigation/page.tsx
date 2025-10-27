"use client"

import { Canvas } from '@react-three/fiber'
import { TexturedEarth } from '@/components/three/TexturedEarth'
import { EarthBriefingOverlay } from '@/components/ui/overlay/EarthBriefingOverlay'
import { ShipSystems } from '@/components/ui/ShipSystems'
import { ShipDecks } from '@/components/ui/ShipDecks'
import { useState, useEffect } from 'react'
import { Footer } from "@/components/layout/Footer"
import { NavigationEffect } from "@/components/layout/NavigationEffect"

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
    <NavigationEffect>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Overlay */}
        <EarthBriefingOverlay 
          isOpen={isBriefingOpen} 
          onClose={handleCloseBriefing}
          isEarthZoomed={isEarthZoomed}
        />
        
        {/* Single Glassmorphism Frame - Contains everything except footer */}
        <div className="h-screen p-3">
          <div className="h-full bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
            
            {/* Header Text with Colored Dots - Inside the frame */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-3 items-center text-base text-white gap-8">
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
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 h-[calc(100%-80px)] gap-8">
              
              {/* Left - Ship Systems */}
              <ShipSystems />

              {/* Center - Full Screen Earth */}
              <div className="col-span-8 relative flex items-center justify-center">
                <div className="w-full h-full">
                  <Canvas
                    camera={{
                      position: [0, 0, isEarthZoomed ? 1.5 : 3.1],
                      fov: 60,
                      near: 0.1,
                      far: 1000
                    }}
                  >
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
              <ShipDecks />
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </NavigationEffect>
  )
}