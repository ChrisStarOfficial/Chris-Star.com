"use client"

import { useEffect } from "react"
import { useEasterEggs } from '@/components/shared/hooks/useEasterEggs'
import BullRun from '@/app/components/not-found/BullRun'
import AnimatedTransition from '@/app/components/not-found/AnimatedTransition'

interface ProtocolOverlayProps {
  isOpen: boolean
  onClose: () => void
  minigameScore: number
  minigameHighScore: number
  onScoreUpdate: (score: number) => void
  onHighScoreUpdate: (score: number) => void
}

export function ProtocolOverlay({ 
  isOpen, 
  onClose, 
  minigameScore, 
  minigameHighScore, 
  onScoreUpdate, 
  onHighScoreUpdate 
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
        <div className="h-full">
          <AnimatedTransition show={true} className="h-full">

            {/* Game Container - centered in the full space */}
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-4xl">
                <BullRun
                  onScoreUpdate={onScoreUpdate}
                  onHighScoreUpdate={onHighScoreUpdate}
                  initialHighScore={minigameHighScore}
                />
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  )
}