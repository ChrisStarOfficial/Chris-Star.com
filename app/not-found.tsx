"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/Footer"
import { EasterEggs } from '@/hooks/EasterEggs'
import BullRun from '@/components/BullRun'
import SacredGeometryBackground from '@/components/SacredGeometryBackground'
import ErrorHeader from '@/components/ErrorHeader'
import GeometricMandala from '@/components/GeometricMandala'
import NavigationButtons from '@/components/NavigationButtons'
import AnimatedTransition from '@/components/AnimatedTransition'

export default function NotFound() {
  const [showMinigame, setShowMinigame] = useState(false)
  const [geometryActive, setGeometryActive] = useState(false)
  const [minigameScore, setMinigameScore] = useState(0)
  const [minigameHighScore, setMinigameHighScore] = useState(0)
  const { discovered, discoverEgg } = EasterEggs()

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

          <AnimatedTransition show={showMinigame}>
            <BullRun 
              onScoreUpdate={setMinigameScore}
              onHighScoreUpdate={setMinigameHighScore}
              initialHighScore={minigameHighScore}
            />
          </AnimatedTransition>

          <NavigationButtons />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}