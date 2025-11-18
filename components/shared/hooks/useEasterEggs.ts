"use client"

import { useState, useEffect } from 'react'

export type EasterEgg = 'footer' | '404'

export function useEasterEggs() {
  const [discovered, setDiscovered] = useState<EasterEgg[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load from localStorage on mount
    const saved = localStorage.getItem('easter-eggs')
    if (saved) {
      setDiscovered(JSON.parse(saved))
    }
  }, [])

  const discoverEgg = (egg: EasterEgg) => {
    if (!discovered.includes(egg)) {
      const newDiscovered = [...discovered, egg]
      setDiscovered(newDiscovered)
      if (isClient) {
        localStorage.setItem('easter-eggs', JSON.stringify(newDiscovered))
      }
    }
  }

  const resetEggs = () => {
    setDiscovered([])
    if (isClient) {
      localStorage.removeItem('easter-eggs')
    }
  }

  return { discovered, discoverEgg, resetEggs, isClient }
}