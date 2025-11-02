"use client"

import { Canvas } from '@react-three/fiber'
import { TexturedEarth } from '@/components/three/TexturedEarth'
import { EarthBriefingOverlay } from '@/components/ui/overlay/EarthBriefingOverlay'
import { StatusReport } from '@/components/ui/StatusReport'
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
          <div className="h-full bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 relative">
            
            {/* Top Bar - Contains Status Report, Center Indicators, and Ship Decks */}
            <div className="absolute top-8 left-8 right-8 z-10">
              <div className="grid grid-cols-12 items-start"> {/* Changed to items-start */}
                {/* Left - Status Report */}
                <div className="col-span-3">
                  <StatusReport />
                </div>
                
                {/* Center - Header Indicators */}
                <div className="col-span-6 flex justify-center">
                  <div className="grid grid-cols-3 items-center text-base text-white gap-12"> {/* Changed to flex row */}
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
                
                {/* Right - Ship Decks */}
                <div className="col-span-3 flex justify-end">
                  <ShipDecks />
                </div>
              </div>
            </div>

            {/* Main Earth Content - Full center */}
            <div className="w-full h-full flex items-center justify-center" style={{ paddingTop: '80px' }}>
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
                <div className="absolute bottom-1/8 left-1/2 transform -translate-x-1/2 text-base tracking-[0.3em] opacity-80 font-light">
                  CLICK TO BRIEF
                </div>
              )}
            </div>

            {/* Bottom Left - Star Chart */}
            <div className="absolute bottom-8 left-8 z-10">
              <div className='text-clay opacity-80'>Star Chart: 91048j27351a6088b39</div>
            </div>
            
            {/* Bottom Right - Ship Name */}
            <div className="absolute bottom-8 right-8 z-10">
              <div className='text-clay opacity-80'>Starship: Dux Ferox</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </NavigationEffect>
  )
}