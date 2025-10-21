"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import SacredGeometryBackground from '@/components/archive/not-found/SacredGeometryBackground'
import ErrorHeader from '@/components/archive/not-found/NavigationErrorHeader'
import { PrimeRadiant } from '@/components/three/PrimeRadiant'
import { Canvas } from '@react-three/fiber'
import { ActivateProtocol } from '@/components/ui/ActivateProtocol'
import { ProtocolOverlay } from '@/components/ui/ProtocolOverlay'

export default function NotFound() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [minigameScore, setMinigameScore] = useState(0)
  const [minigameHighScore, setMinigameHighScore] = useState(0)
  const [use3DGame, setUse3DGame] = useState(true)

  const handleProtocolClick = () => {
    setShowOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowOverlay(false)
  }

  const toggleGameVersion = () => {
    setUse3DGame(!use3DGame)
    setMinigameScore(0)
  }

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <SacredGeometryBackground />

      {/* Protocol Overlay */}
      <ProtocolOverlay
        isOpen={showOverlay}
        onClose={handleCloseOverlay}
        minigameScore={minigameScore}
        minigameHighScore={minigameHighScore}
        use3DGame={use3DGame}
        onScoreUpdate={setMinigameScore}
        onHighScoreUpdate={setMinigameHighScore}
        onToggleGameVersion={toggleGameVersion}
      />

      <div className="relative z-10 min-h-screen">
        {/* Header - Absolutely positioned at top */}
        <div className="absolute top-1/8 left-0 right-0 h-48 flex items-center justify-center">
          <ErrorHeader />
        </div>

        {/* Center Section - Full screen centering */}
        <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center -translate-y-1/2">
          
          {/* Left Text */}
          <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <div className="w-2 h-2 bg-cyan-400/80 rounded-full" />
              <span className="text-cyan-300/90 text-xs font-sans tracking-wider font-light">
                ENTERTAINMENT PROTOCOLS AVAILABLE
              </span>
            </div>
          </div>

          {/* Prime Radiant Container */}
          <div className="relative transition-all duration-1000">
            <div className="relative w-96 h-96 group">
              {/* 3D Prime Radiant - simplified */}
              <Canvas className="w-full h-full style={{ background: 'transparent' }}">
                <PrimeRadiant 
                  active={true}
                  onClick={() => {}} // Empty handler since button handles the click
                />
              </Canvas>

              {/* Activate Protocol Button */}
              <ActivateProtocol onClick={handleProtocolClick} />
            </div>
          </div>

          {/* Right Buttons */}
          <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <div className="flex flex-col space-y-4">
              <Link
                href="/navigation"
                className="bg-amber-600/90 text-white px-8 py-3 rounded-xl font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-amber-500/30 text-center min-w-[180px]"
                style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
              >
                ▶ RETURN TO NAVIGATION
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}