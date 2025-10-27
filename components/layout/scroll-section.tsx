"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { AnimationDirection } from "@/types/design-tokens"

interface ScrollSectionProps {
  children: React.ReactNode
  direction?: AnimationDirection
  delay?: number
  threshold?: number
  parallax?: boolean
  intensity?: number
  triggerOnce?: boolean
  duration?: "fast" | "normal" | "slow"
}

export function ScrollSection({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.1,
  parallax = false,
  intensity = 0.5,
  triggerOnce = true,
  duration = "normal"
}: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // Unified duration mapping
  const durationClass = {
    fast: "duration-500",
    normal: "duration-700",
    slow: "duration-1000"
  }[duration]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (triggerOnce && hasAnimated) return
            
          setTimeout(() => {
            setIsVisible(true)
            if (triggerOnce) {
              setHasAnimated(true)
            }
          }, delay)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
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
  }, [delay, threshold, hasAnimated, parallax, intensity, triggerOnce])

  const getAnimationClass = () => {
    const baseClass = `transition-all ease-out ${durationClass}`

    if (!isVisible) {
      switch (direction) {
        case "left":
          return `${baseClass} opacity-0 -translate-x-8`
        case "right":
          return `${baseClass} opacity-0 translate-x-8`
        case "down":
          return `${baseClass} opacity-0 -translate-y-8`
        case "fade":
          return `${baseClass} opacity-0`
        case "scale":
          return `${baseClass} opacity-0 scale-95`
        case "stagger":
          return `${baseClass} opacity-0`
        case "up":
        default:
          return `${baseClass} opacity-0 translate-y-8`
      }
    }

    const visibleClass = `${baseClass} opacity-100 translate-x-0 translate-y-0 scale-100`
    return direction === "stagger" ? `${visibleClass} stagger-children animate` : visibleClass
  }

  const parallaxStyle = parallax
    ? { transform: `translateY(${scrollY}px)` }
    : {}

  return (
    <div 
      ref={ref} 
      className={getAnimationClass()} 
      style={parallaxStyle}
    >
      {children}
    </div>
  )
}