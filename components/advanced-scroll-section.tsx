"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AdvancedScrollSectionProps {
  children: React.ReactNode
  direction?: "up" | "left" | "right" | "fade" | "scale" | "stagger"
  delay?: number
  threshold?: number
  parallax?: boolean
  intensity?: number
}

export function AdvancedScrollSection({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.1,
  parallax = false,
  intensity = 0.5,
}: AdvancedScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    const handleScroll = () => {
      if (parallax && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const rate = scrolled * -intensity
        setScrollY(rate)
      }
    }

    if (parallax) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      if (parallax) {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [delay, threshold, hasAnimated, parallax, intensity])

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1200 ease-out"

    if (!isVisible) {
      switch (direction) {
        case "left":
          return `${baseClass} opacity-0 -translate-x-20 scale-95`
        case "right":
          return `${baseClass} opacity-0 translate-x-20 scale-95`
        case "fade":
          return `${baseClass} opacity-0`
        case "scale":
          return `${baseClass} opacity-0 scale-90`
        case "stagger":
          return `${baseClass} stagger-children`
        default:
          return `${baseClass} opacity-0 translate-y-20 scale-95`
      }
    }

    const visibleClass = `${baseClass} opacity-100 translate-x-0 translate-y-0 scale-100`
    return direction === "stagger" ? `${visibleClass} stagger-children animate` : visibleClass
  }

  const parallaxStyle = parallax
    ? {
        transform: `translateY(${scrollY}px)`,
      }
    : {}

  return (
    <div ref={ref} className={getAnimationClass()} style={parallaxStyle}>
      {children}
    </div>
  )
}
