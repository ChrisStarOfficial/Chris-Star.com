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
      discoverEgg('footer')
      setShowShockwave(true)
      setIsTransformed(true)
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
      setIsTransformed(false)
      setShowShockwave(false)
      router.push("/")
    } else {
      setClickCount((prev) => prev + 1)
      setTimeout(() => {
        if (clickCount < 1) {
          setClickCount(0)
        }
      }, 1000)
    }
  }

  const ImageComponent = ({ isTransformed, className }: { isTransformed: boolean, className: string }) => (
    <Image
      src="/logos/Icon.png"
      alt="CSE"
      width={36}
      height={36}
      className={`drop-shadow-lg transition-all duration-500 ${className} ${
        isTransformed ? "brightness-110 contrast-125" : ""
      }`}
    />
  )

  if (!isMounted) {
    return (
      <div className={`relative ${className}`} style={{ lineHeight: 0 }}>
        <ImageComponent isTransformed={false} className="" />
      </div>
    )
  }

  return (
    // Key change: Added flex container to fill available space
    <div className={`relative flex items-center justify-center ${className}`} style={{ contain: 'layout', height: '100%', minHeight: '1.5rem' }}>
      {/* Shockwave Effect */}
      {showShockwave && (
        <>
          <div 
            className="absolute inset-0 -m-8 rounded-full border-4 border-amber-400 animate-ping opacity-75"
            style={{ pointerEvents: 'none' }}
          />
          <div
            className="absolute inset-0 -m-12 rounded-full border-2 border-amber-300 animate-ping opacity-50"
            style={{ animationDelay: "0.2s", pointerEvents: 'none' }}
          />
          <div
            className="absolute inset-0 -m-16 rounded-full border border-amber-200 animate-ping opacity-25"
            style={{ animationDelay: "0.4s", pointerEvents: 'none' }}
          />
        </>
      )}

      {/* Logo Container - Now fills the available height */}
      <div
        onClick={isClient ? handleClick : undefined}
        className={`transition-all duration-500 flex items-center justify-center ${
          isClient ? "cursor-pointer hover:scale-105" : ""
        } ${
          isTransformed
            ? "shadow-2xl shadow-amber-400/50 animate-pulse scale-110"
            : "" 
        }`}
        style={{ height: '100%' }}
      >
        <ImageComponent isTransformed={false} className="" />
      </div>

      {/* Hint text for transformed state */}
      {isTransformed && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-400 font-sans animate-pulse whitespace-nowrap">
          Click to go home!
        </div>
      )}
    </div>
  )
}