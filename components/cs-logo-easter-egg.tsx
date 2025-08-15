"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface CSLogoEasterEggProps {
  className?: string
}

export function CSLogoEasterEgg({ className = "" }: CSLogoEasterEggProps) {
  const [clickCount, setClickCount] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)
  const [showShockwave, setShowShockwave] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (clickCount === 2) {
      // Trigger golden shockwave
      setShowShockwave(true)
      setIsTransformed(true)

      // Reset click count after animation
      setTimeout(() => {
        setClickCount(0)
      }, 2000)
    }
  }, [clickCount])

  useEffect(() => {
    if (showShockwave) {
      setTimeout(() => {
        setShowShockwave(false)
      }, 1000)
    }
  }, [showShockwave])

  const handleClick = () => {
    if (isTransformed) {
      // Navigate to home
      router.push("/")
    } else {
      setClickCount((prev) => prev + 1)

      // Reset click count after 2 seconds if not reached 2
      setTimeout(() => {
        if (clickCount < 1) {
          setClickCount(0)
        }
      }, 2000)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Shockwave Effect */}
      {showShockwave && (
        <>
          <div className="absolute inset-0 -m-8 rounded-full border-4 border-amber-400 animate-ping opacity-75" />
          <div
            className="absolute inset-0 -m-12 rounded-full border-2 border-amber-300 animate-ping opacity-50"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="absolute inset-0 -m-16 rounded-full border border-amber-200 animate-ping opacity-25"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      )}

      {/* CS Logo */}
      <div
        onClick={handleClick}
        className={`w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center shadow-lg cursor-pointer transition-all duration-500 ${
          isTransformed
            ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl shadow-amber-400/50 animate-pulse scale-110"
            : "hover:scale-105"
        }`}
      >
        <span
          className={`text-white font-sans font-bold text-xl transition-all duration-500 ${
            isTransformed ? "text-gray-900 drop-shadow-lg" : ""
          }`}
        >
          CS
        </span>
      </div>

      {/* Hint text for transformed state */}
      {isTransformed && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-amber-400 font-sans animate-bounce whitespace-nowrap">
          Click to go home!
        </div>
      )}
    </div>
  )
}
