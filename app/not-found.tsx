"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import { useEasterEggs } from '@/hooks/useEasterEggs'
import BullRun3D from '@/components/games/BullRun3D'
import BullRun2D from '@/components/games/BullRun2D'
import SacredGeometryBackground from '@/components/archive/not-found/SacredGeometryBackground'
import ErrorHeader from '@/components/archive/not-found/ErrorHeader'
import AnimatedTransition from '@/components/archive/not-found/AnimatedTransition'
import { PrimeRadiant } from '@/components/three/PrimeRadiant'
import { Canvas } from '@react-three/fiber'

export default function NotFound() {
  const [showMinigame, setShowMinigame] = useState(false)
  const [minigameScore, setMinigameScore] = useState(0)
  const [minigameHighScore, setMinigameHighScore] = useState(0)
  const [use3DGame, setUse3DGame] = useState(true)
  const { discovered, discoverEgg } = useEasterEggs()

  useEffect(() => {
    if (!discovered.includes('404')) {
      discoverEgg('404')
    }
  }, [discovered, discoverEgg])

  const handleGeometryClick = () => {
    setShowMinigame(!showMinigame)
  }

  const toggleGameVersion = () => {
    setUse3DGame(!use3DGame)
    setMinigameScore(0)
  }

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <SacredGeometryBackground />

      <div className="relative z-10 min-h-screen">
        {/* Header - Absolutely positioned at top */}
        <div className="absolute top-1/8 left-0 right-0 h-48 flex items-center justify-center">
          <ErrorHeader />
        </div>

        {/* Center Section - Full screen centering */}
        <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center -translate-y-1/2"> {/* min-h-screen forces full viewport height */}
          
          {/* Left Text */}
          <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <div className="w-2 h-2 bg-cyan-400/80 rounded-full" />
              <span className="text-cyan-300/90 text-xs font-sans tracking-wider font-light">
                ENTERTAINMENT PROTOCOLS AVAILABLE
              </span>
            </div>
          </div>

          {/* Prime Radiant */}
          <div className="flex items-center justify-center w-96 h-96">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="w-full h-full"
              gl={{ antialias: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#4f8cff" />
                <PrimeRadiant
                  active={true}
                  onClick={handleGeometryClick}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Right Buttons */}
          <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="bg-amber-600/90 text-white px-8 py-3 rounded-xl font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-amber-500/30 text-center min-w-[180px]"
                style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
              >
                ▶ RETURN TO BASE
              </Link>
              <Link
                href="/community"
                className="border-2 border-amber-400/60 text-amber-400 px-8 py-3 rounded-xl font-sans font-bold text-lg hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300 backdrop-blur-sm text-center min-w-[180px]"
                style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
              >
                ◊ JOIN ALLIANCE
              </Link>
            </div>
          </div>
        </div>

        {/* Minigame Area */}
        <div className="absolute bottom-1/6 left-0 right-0">
          {showMinigame && (
            <div className="flex justify-center mb-6">
              <button
                onClick={toggleGameVersion}
                className="bg-gray-700/70 text-amber-300 px-6 py-3 rounded-lg border border-amber-500/30 hover:bg-gray-600/70 transition-all duration-300 font-sans font-bold text-sm tracking-wide"
              >
                {use3DGame ? 'Switch to 2D Version' : 'Switch to 3D Version'}
              </button>
            </div>
          )}

          <AnimatedTransition show={showMinigame}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mx-8 border border-gray-700/50">
              {/* Game Header */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                  <div
                    className="mx-6 px-8 py-3 border border-amber-400/25 bg-gradient-to-r from-amber-400/8 to-amber-500/8 backdrop-blur-sm"
                    style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
                  >
                    <span className="text-amber-300 font-sans text-sm tracking-[0.2em] font-light">
                      {use3DGame ? '◊ 3D BULL RUN PROTOCOL ◊' : '◊ 2D BULL RUN PROTOCOL ◊'}
                    </span>
                  </div>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-sans">
                    <span className="text-lg font-bold">SCORE: {minigameScore}</span>
                  </div>
                  <div className="text-amber-400 font-sans">
                    <span className="text-lg font-bold">HIGH SCORE: {minigameHighScore}</span>
                  </div>
                </div>
              </div>

              {/* Game Container */}
              {use3DGame ? (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50">
                  <div className="mb-6 text-center">
                    <h3 className="text-amber-300 font-sans text-lg mb-2">Three.js Test</h3>
                    <p className="text-gray-400 text-sm">Testing React Three Fiber setup</p>
                  </div>
                  <BullRun3D />
                </div>
              ) : (
                <BullRun2D
                  onScoreUpdate={setMinigameScore}
                  onHighScoreUpdate={setMinigameHighScore}
                  initialHighScore={minigameHighScore}
                />
              )}

              {/* Game Instructions */}
              <div className="mt-6 text-sm text-gray-400 font-sans text-center tracking-wide space-y-1">
                <p>{use3DGame ? 'Click to jump over obstacles' : 'Use SPACEBAR or CLICK to jump'}</p>
                <p>Avoid obstacles • Beat your high score!</p>
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}