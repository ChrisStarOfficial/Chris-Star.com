"use client"

import { useEffect, useRef, useState } from "react"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/Hero"
import { TransformationalLeadership } from "@/components/sections/Services"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const heroRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const scrollY = window.scrollY
    setScrollY(scrollY)
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

  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection isLoaded={isLoaded} scrollY={scrollY} />
      
      <TransformationalLeadership />
      <Footer />
    </main>
  )
}