"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/layout/Footer"
import { AudioManager } from "@/components/archive/navigation/AudioManager"
import { HyperspaceEffect } from "@/components/archive/navigation/HyperspaceEffect"
import { LoadingScreen } from "@/components/archive/navigation/LoadingScreen"
import { HeroSection } from "@/components/sections/Hero"
import { NavigationSection } from "@/components/archive/navigation/NavigationSection"
import { TransformationalLeadership } from "@/components/sections/Services"
import { useMousePosition } from "@/hooks/useMousePosition"

export default function HomePage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [isHyperspace, setIsHyperspace] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [cameraAngle, setCameraAngle] = useState(0)
  const [satellitesVisible, setSatellitesVisible] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)
  const { playSound } = AudioManager()
  const mousePosition = useMousePosition()

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId)
    playSound('click')
    
    const element = document.getElementById(`destination-${destinationId}`)
    if (element) {
      element.style.animation = 'flash 0.3s ease-in-out 3'
    }
    
    setTimeout(() => {
      setIsHyperspace(true)
      playSound('hyperspace')
      
      setTimeout(() => {
        setIsHyperspace(false)
        setIsLoading(true)
        
        let progress = 0
        const loadingInterval = setInterval(() => {
          progress += Math.random() * 15
          setLoadingProgress(Math.min(progress, 100))
          
          if (progress >= 100) {
            clearInterval(loadingInterval)
            router.push(`/${destinationId}`)
          }
        }, 100)
      }, 2000)
    }, 2000)
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    setScrollY(scrollY)
    
    const navigationTop = navigationRef.current?.offsetTop || 0
    const navigationHeight = navigationRef.current?.offsetHeight || 0
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - navigationTop + window.innerHeight) / navigationHeight))
    
    if (scrollProgress > 0 && scrollProgress < 1) {
      setShowNavigation(true)
    } else if (scrollProgress >= 1) {
      setShowNavigation(true)
    } else {
      setShowNavigation(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isHyperspace) {
    return <HyperspaceEffect />
  }

  if (isLoading) {
    return <LoadingScreen loadingProgress={loadingProgress} />
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection isLoaded={isLoaded} scrollY={scrollY} />
      
      <NavigationSection
        showNavigation={showNavigation}
        selectedDestination={selectedDestination}
        mousePosition={mousePosition}
        onDestinationSelect={handleDestinationSelect}
        onDestinationDeselect={() => setSelectedDestination(null)}
      />
      
      <TransformationalLeadership />
      <Footer />
    </main>
  )
}