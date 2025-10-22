"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DeckItem {
  name: string
  path: string
}

const decks: DeckItem[] = [
  { name: 'Bridge', path: '/' },
  { name: 'Navigation', path: '/navigation' },
  { name: 'The Archives', path: '/archives' },
  { name: 'Personal Quarters', path: '/quarters' },
  { name: 'Lounge', path: '/not-found' },
]

export function ShipDecks() {
  const pathname = usePathname()
  const router = useRouter()
  const [isValidRoute, setIsValidRoute] = useState(true)

  // Check if current path is a valid deck route
  useEffect(() => {
    const isValid = decks.some(deck => deck.path === pathname) || pathname === '/'
    setIsValidRoute(isValid)
  }, [pathname])

  const handleDeckClick = (path: string) => {
    router.push(path)
  }

  const getCurrentDeck = () => {
    // If we're on a valid deck page, return it
    const currentDeck = decks.find(deck => deck.path === pathname)
    if (currentDeck) return currentDeck.name
    
    // If we're on the root, return Bridge
    if (pathname === '/') return 'Bridge'
    
    // If we're on any invalid route, default to Lounge
    return 'Lounge'
  }

  const currentDeck = getCurrentDeck()

  return (
    <div className="col-span-2 z-10 flex flex-col justify-center">
      <div className="text-lg font-sans mb-4 opacity-90">SHIP DECKS</div>
      {decks.map((deck) => {
        const isCurrentDeck = deck.name === currentDeck
        
        return (
          <button
            key={deck.path}
            onClick={() => handleDeckClick(deck.path)}
            className={`text-left transition-colors cursor-pointer ${
              isCurrentDeck
                ? 'text-blue-300 opacity-90' // Current deck - static blue, no hover effect
                : 'opacity-80 hover:text-blue-300 hover:opacity-100' // Other decks - get blue on hover
            }`}
          >
            {isCurrentDeck ? '▶ ' : ''}{deck.name}
          </button>
        )
      })}
    </div>
  )
}