"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import SacredGeometryBackground from '@/components/archive/not-found/SacredGeometryBackground'
import ErrorHeader from '@/components/ui/NavigationErrorHeader'
import { PrimeRadiant } from '@/components/three/PrimeRadiant'
import { Canvas } from '@react-three/fiber'
import { ActivateProtocol } from '@/components/ui/ActivateProtocol'
import { ProtocolOverlay } from '@/components/ui/ProtocolOverlay'
import { ShipDecks } from '@/components/ui/ShipDecks'
import * as THREE from 'three'

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

      {/* Header - Absolutely positioned */}
      <div className="absolute top-4 left-0 right-0 z-40">
        <div className="flex justify-center">
          <ErrorHeader />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 h-screen gap-8">
        
        {/* Left Column */}
        <div className="col-start-1 col-span-4 flex items-center justify-center h-full">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <div className="w-2 h-2 bg-cyan-400/80 rounded-full" />
            <span className="text-cyan-300/90 text-xs font-sans tracking-wider font-light">
              ENTERTAINMENT PROTOCOLS AVAILABLE
            </span>
          </div>
        </div>
        
        {/* Center Column - Canvas as interactive background */}
        <div className="col-start-5 col-span-4 flex items-center justify-center h-full">
          {/* Canvas takes full space but behind content */}
          <div className="aspect-square w-full max-w-2xl relative">
            <Canvas
              camera={{ 
                position: [0, 0, 8],
                fov: 45,
                near: 0.1,
                far: 100
              }}
              gl={{
                antialias: true,
                alpha: true,
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#4f8cff" />
                <PrimeRadiant
                  active={true}
                  onClick={() => {}}
                />
              </Suspense>
            </Canvas>

          {/* ActivateProtocol on top */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-36 pointer-events-auto">
              <ActivateProtocol onClick={handleProtocolClick} />
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="col-start-9 col-span-4 flex items-center justify-center h-full">
          <ShipDecks />
        </div>
      </div>
          
      <Footer />
    </main>
  )
}