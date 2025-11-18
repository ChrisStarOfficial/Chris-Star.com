"use client"

import { useEffect, Suspense } from "react"
import { useEasterEggs } from '@/components/shared/hooks/useEasterEggs'
import BullRun3D from '@/components/features/games/BullRun3D'
import BullRun2D from '@/components/features/games/BullRun2D'
import AnimatedTransition from '@/components/pages/not-found/AnimatedTransition'

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3"
      onClick={onClose}
    >
      {/* Glassmorphism Background */}
      <div 
        className="h-full w-full bg-mineral/20 backdrop-blur-xl rounded-3xl border border-clay/10 shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-10 h-10 flex items-center justify-center text-parchment/80 hover:text-parchment bg-parchment/10 hover:bg-parchment/20 rounded-full backdrop-blur-sm border border-clay transition-all duration-300 pointer-events-auto"
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
              className="bg-mineral/70 text-luminance px-6 py-3 rounded-lg border border-luminance/30 hover:bg-stone/70 transition-all duration-300 font-sans font-bold text-sm tracking-wide"
            >
              {use3DGame ? 'Switch to 2D Version' : 'Switch to 3D Version'}
            </button>
          </div>

          <AnimatedTransition show={true}>
            <div className="flex-1 bg-mineral/50 backdrop-blur-sm rounded-3xl p-8 border border-stone/50 flex flex-col">
              {/* Game Header */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-luminance/30 to-transparent" />
                  <div
                    className="mx-6 px-8 py-3 border border-luminance/25 bg-gradient-to-r from-luminance/8 to-luminance/20 backdrop-blur-sm"
                    style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
                  >
                    <span className="text-luminance font-sans text-sm tracking-[0.2em] font-light">
                      {use3DGame ? '◊ 3D BULL RUN PROTOCOL ◊' : '◊ 2D BULL RUN PROTOCOL ◊'}
                    </span>
                  </div>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-luminance/30 to-transparent" />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-parchment font-sans">
                    <span className="text-lg font-bold">SCORE: {minigameScore}</span>
                  </div>
                  <div className="text-luminance font-sans">
                    <span className="text-lg font-bold">HIGH SCORE: {minigameHighScore}</span>
                  </div>
                </div>
              </div>

              {/* Game Container */}
              <div className="flex-1 flex items-center justify-center">
                {use3DGame ? (
                  <div className="bg-mineral/50 backdrop-blur-sm rounded-3xl p-8 w-full max-w-2xl border border-stone/50">
                    <div className="mb-6 text-center">
                      <h3 className="text-luminance font-sans text-lg mb-2">Three.js Test</h3>
                      <p className="text-clay text-sm">Testing React Three Fiber setup</p>
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
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  )
}