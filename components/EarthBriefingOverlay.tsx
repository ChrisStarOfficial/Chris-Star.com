"use client"

import { useEffect } from 'react'

interface EarthBriefingOverlayProps {
  isOpen: boolean
  onClose: () => void
  isEarthZoomed: boolean
}

export function EarthBriefingOverlay({ isOpen, onClose, isEarthZoomed }: EarthBriefingOverlayProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - Click outside to close */}
      <div 
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />
      
      {/* Glass Side Panel */}
      <div 
        className="fixed right-1/4 top-1/2 transform -translate-y-1/2 z-50"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        {/* Connection Lines from Overlay to Earth */}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2">
          <div className="w-32 h-[2px] bg-white/40" />
        </div>
        
        {/* Glass Panel Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-80 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl text-white font-light tracking-wider">EARTH</h2>
          </div>

          {/* Planetary Data - Free Flowing */}
          <div className="space-y-3 text-white/90">
            <div>
              <div className="text-white/70 text-sm tracking-wide">SURFACE POPULATION</div>
              <div className="text-white font-light text-lg">1.62 Billion</div>
            </div>
            <div>
              <div className="text-white/70 text-sm tracking-wide">DIAMETER</div>
              <div className="text-white font-light">12,742 km</div>
            </div>
            <div>
              <div className="text-white/70 text-sm tracking-wide">GRAVITY</div>
              <div className="text-white font-light">1g</div>
            </div>
            <div>
              <div className="text-white/70 text-sm tracking-wide">OXYGEN</div>
              <div className="text-white font-light">20.95%</div>
            </div>
            <div>
              <div className="text-white/70 text-sm tracking-wide">CLIMATE</div>
              <div className="text-white font-light">Harsh</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}