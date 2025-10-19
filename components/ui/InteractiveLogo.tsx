"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEasterEggs } from "@/hooks/useEasterEggs"

interface InteractiveLogoProps {
  className?: string
}

export function InteractiveLogo({ className = "" }: InteractiveLogoProps) {
  const [clickCount, setClickCount] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)
  const [showShockwave, setShowShockwave] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  
  const { discovered, discoverEgg, isClient } = useEasterEggs()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && clickCount === 2 && isClient) {
      // Discover the easter egg
      discoverEgg('footer')

      // Trigger golden shockwave
      setShowShockwave(true)
      setIsTransformed(true)

      // Reset click count after animation
      setTimeout(() => {
        setClickCount(0)
      }, 2000)
    }
  }, [clickCount, discoverEgg, isMounted, isClient])

  useEffect(() => {
    if (showShockwave) {
      setTimeout(() => {
        setShowShockwave(false)
      }, 1000)
    }
  }, [showShockwave])

  const handleClick = () => {
    if (!isMounted || !isClient) return

    if (isTransformed) {
      // Reset transformation state before navigating
      setIsTransformed(false)
      setShowShockwave(false)
      // Navigate to home
      router.push("/")
    } else {
      setClickCount((prev) => prev + 1)
      // Reset click count after 1 seconds if not reached 2
      setTimeout(() => {
        if (clickCount < 1) {
          setClickCount(0)
        }
      }, 1000)
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

      {/* CSE Logo with Easter Egg */}
      <div
        onClick={(isMounted && isClient) ? handleClick : undefined}
        className={`transition-all duration-500 ${
          (isMounted && isClient) ? "cursor-pointer hover:scale-105" : ""
        } ${
          isTransformed
            ? "shadow-2xl shadow-amber-400/50 animate-pulse scale-110"
            : "" 
        }`}
      >
        <Image
          src="/Icon.png"
          alt="CSE"
          width={36}
          height={36}
          className={`drop-shadow-lg transition-all duration-500 ${
            isTransformed ? "brightness-110 contrast-125" : ""
          }`}
        />
      </div>

      {/* Hint text for transformed state */}
      {isTransformed && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-amber-400 font-sans animate-pulse whitespace-nowrap">
          Click to go home!
        </div>
      )}
    </div>
  )
}
