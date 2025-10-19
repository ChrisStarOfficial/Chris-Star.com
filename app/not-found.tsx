"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import { useEasterEggs } from '@/hooks/useEasterEggs'
import BullRun3D from '@/components/games/BullRun3D' // New 3D game
import BullRun2D from '@/components/games/BullRun2D' // Your existing 2D game
import SacredGeometryBackground from '@/components/archive/not-found/SacredGeometryBackground'
import ErrorHeader from '@/components/archive/not-found/ErrorHeader'
import GeometricMandala from '@/components/archive/not-found/GeometricMandala'
import NavigationButtons from '@/components/archive/not-found/NavigationButtons'
import AnimatedTransition from '@/components/archive/not-found/AnimatedTransition'

export default function NotFound() {
  const [showMinigame, setShowMinigame] = useState(false)
  const [geometryActive, setGeometryActive] = useState(false)
  const [minigameScore, setMinigameScore] = useState(0)
  const [minigameHighScore, setMinigameHighScore] = useState(0)
  const [use3DGame, setUse3DGame] = useState(true) // Toggle between 2D and 3D
  const { discovered, discoverEgg } = useEasterEggs()

  useEffect(() => {
    if (!discovered.includes('404')) {
      discoverEgg('404')
    }
  }, [discovered, discoverEgg])

  useEffect(() => {
    const timer = setTimeout(() => {
      setGeometryActive(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          <ErrorHeader />

          <GeometricMandala 
            active={geometryActive} 
            onClick={handleGeometryClick} 
          />

          {/* Game Version Toggle */}
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50">
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

          <NavigationButtons />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}