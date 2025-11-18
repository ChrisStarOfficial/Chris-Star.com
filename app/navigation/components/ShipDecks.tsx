"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLoading } from '@/components/shared/contexts/LoadingContext'

interface DeckItem {
  name: string
  path: string
}

const decks: DeckItem[] = [
  { name: 'Bridge', path: '/' },
  { name: 'Navigation', path: '/navigation' },
  { name: 'The Archives', path: '/archives' },
  { name: 'Personal Quarters', path: '/chris' },
  { name: 'Lounge', path: '/not-found' },
]

export function ShipDecks() {
  const pathname = usePathname()
  const router = useRouter()
  const [isValidRoute, setIsValidRoute] = useState(true)
  const { startLoading, updateProgress, stopLoading } = useLoading()

  useEffect(() => {
    const isValid = decks.some(deck => deck.path === pathname) || pathname === '/'
    setIsValidRoute(isValid)
  }, [pathname])

  const handleDeckClick = async (path: string) => {
    // Start hyperspace loading effect
    startLoading(`WARPING TO ${path === '/' ? 'BRIDGE' : path.toUpperCase().replace('/', '')}`)
    
    // Simulate navigation loading
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 80) {
        clearInterval(interval)
        progress = 80
      }
      updateProgress(progress)
    }, 100)

    // Navigate
    router.push(path)
    
    // Complete loading after navigation
    setTimeout(() => {
      updateProgress(100)
      setTimeout(stopLoading, 300)
    }, 1000)
  }

  const getCurrentDeck = () => {
    const currentDeck = decks.find(deck => deck.path === pathname)
    if (currentDeck) return currentDeck.name
    if (pathname === '/') return 'Bridge'
    return 'Lounge'
  }

  const currentDeck = getCurrentDeck()

  return (
    <div className="col-span-2 z-10 flex flex-col justify-end items-end">
      <div className="text-lg font-serif mb-4 text-parchment opacity-90 text-right">SHIP DECKS</div>
      {decks.map((deck) => {
        const isCurrentDeck = deck.name === currentDeck
        
        return (
          <button
            key={deck.path}
            onClick={() => handleDeckClick(deck.path)}
            className={`text-right transition-colors cursor-pointer w-full flex justify-end ${
              isCurrentDeck
                ? 'text-electric opacity-90'
                : 'text-clay opacity-80 hover:text-electric hover:opacity-100'
            }`}
          >
            {isCurrentDeck ? '▶ ' : ''}{deck.name}
          </button>
        )
      })}
    </div>
  )
}