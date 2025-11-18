"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/layout/footer/Footer"
import { Header } from "@/components/layout/header/Header"
import { HeroSection } from "@/app/components/home/CommunityCTAHero"
import { LatestVideosSection } from "@/app/components/home/LatestVideos"
import { NextStepSection } from "@/app/components/home/NextStep"
import { useYouTubeVideos } from "@/components/shared/hooks/useYouTubeVideos"

export default function SpiritualHomepage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { videos, loading, error } = useYouTubeVideos()

  // Handle mouse movement for subtle parallax
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      <HeroSection mousePosition={mousePosition} />
      <LatestVideosSection 
        mousePosition={mousePosition}
        videos={videos}
        loading={loading}
        error={error}
      />
      <NextStepSection />
      <Footer />
    </main>
  )
}