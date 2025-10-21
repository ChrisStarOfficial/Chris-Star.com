"use client"

import { useEffect, Suspense } from "react"
import { useEasterEggs } from '@/hooks/useEasterEggs'
import BullRun3D from '@/components/games/BullRun3D'
import BullRun2D from '@/components/games/BullRun2D'
import AnimatedTransition from '@/components/archive/not-found/AnimatedTransition'

interface ProtocolOverlayProps {
  isOpen: boolean
  onClose: () => void
  minigameScore: number
  minigameHighScore: number
  use3DGame: boolean
  onScoreUpdate: (score: number) => void
  onHighScoreUpdate: (score: number) => void
  onToggleGameVersion: () => void
}

export function ProtocolOverlay({ 
  isOpen, 
  onClose, 
  minigameScore, 
  minigameHighScore, 
  use3DGame, 
  onScoreUpdate, 
  onHighScoreUpdate, 
  onToggleGameVersion 
}: ProtocolOverlayProps) {
  const { discovered, discoverEgg } = useEasterEggs()

  useEffect(() => {
    if (!discovered.includes('404') && isOpen) {
      discoverEgg('404')
    }
  }, [discovered, discoverEgg, isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      onClick={onClose} // Close when clicking outside
    >
      {/* Glassmorphism Background - same as Navigation */}
      <div 
        className="h-full w-full bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300"
          aria-label="Close overlay"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="h-full flex flex-col">
          {/* Game Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={onToggleGameVersion}
              className="bg-gray-700/70 text-amber-300 px-6 py-3 rounded-lg border border-amber-500/30 hover:bg-gray-600/70 transition-all duration-300 font-sans font-bold text-sm tracking-wide"
            >
              {use3DGame ? 'Switch to 2D Version' : 'Switch to 3D Version'}
            </button>
          </div>

          <AnimatedTransition show={true}>
            <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 flex flex-col">
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
              <div className="flex-1 flex items-center justify-center">
                {use3DGame ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 w-full max-w-2xl border border-gray-700/50">
                    <div className="mb-6 text-center">
                      <h3 className="text-amber-300 font-sans text-lg mb-2">Three.js Test</h3>
                      <p className="text-gray-400 text-sm">Testing React Three Fiber setup</p>
                    </div>
                    <BullRun3D />
                  </div>
                ) : (
                  <div className="w-full max-w-4xl">
                    <BullRun2D
                      onScoreUpdate={onScoreUpdate}
                      onHighScoreUpdate={onHighScoreUpdate}
                      initialHighScore={minigameHighScore}
                    />
                  </div>
                )}
              </div>

              {/* Game Instructions */}
              <div className="mt-6 text-sm text-gray-400 font-sans text-center tracking-wide space-y-1">
                <p>{use3DGame ? 'Click to jump over obstacles' : 'Use SPACEBAR or CLICK to jump'}</p>
                <p>Avoid obstacles • Beat your high score!</p>
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  )
}