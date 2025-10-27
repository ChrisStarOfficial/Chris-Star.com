"use client"

import { useLoading } from "./LoadingContext"

interface ActivateProtocolProps {
  onClick: () => void
  loadTime?: number // Simulated load time in ms
}

export function ActivateProtocol({ onClick, loadTime = 3000 }: ActivateProtocolProps) {
  const { startLoading, updateProgress, stopLoading } = useLoading()

  const handleClick = async () => {
    startLoading("INITIALIZING BULL RUN PROTOCOL")
    
    // Simulate loading progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 90) {
        clearInterval(interval)
        progress = 90
      }
      updateProgress(progress)
    }, loadTime / 10)

    // Execute the original onClick
    await onClick()

    // Complete loading
    updateProgress(100)
    setTimeout(() => {
      stopLoading()
    }, 500)
  }
  
  return (
    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 whitespace-nowrap cursor-pointer">
      <div 
        onClick={handleClick}
        className="text-parchment font-sans text-xl font-bold tracking-widest bg-cosmic/80 px-6 py-3 rounded-xl backdrop-blur-sm border-2 border-clay hover:bg-mineral hover:border-electric transition-all duration-300"
      >
        ACTIVATE PROTOCOL
      </div>
    </div>
  )
}