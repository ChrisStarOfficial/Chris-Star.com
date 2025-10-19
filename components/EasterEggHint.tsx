"use client"

import { useState } from 'react'

export function EasterEggHint() {
  const [showHint, setShowHint] = useState(false)
  const [scrambled, setScrambled] = useState(false)

  const revealHint = () => {
    setShowHint(true)
    setTimeout(() => setScrambled(true), 1000)
  }

  return (
    <div className="text-center py-4">
      <button 
        onClick={revealHint}
        className="text-gray-400 hover:text-amber-400 transition-colors text-sm font-sans"
      >
        Do you seek hints to a secret?
      </button>
      
      {showHint && (
        <div className="mt-2 text-amber-300 font-mono text-sm animate-pulse">
          {scrambled ? "The hints are... 4️⃣ and 🦶." : "Decrypting..."}
        </div>
      )}
    </div>
  )
}