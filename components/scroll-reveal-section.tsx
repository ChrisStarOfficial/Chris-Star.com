"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealSectionProps {
  children: React.ReactNode
  direction?: "up" | "left" | "right"
  delay?: number
}

export function ScrollRevealSection({ children, direction = "up", delay = 0 }: ScrollRevealSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    switch (direction) {
      case "left":
        return "animate-slide-in-left"
      case "right":
        return "animate-slide-in-right"
      default:
        return "animate-fade-in-up"
    }
  }

  return (
    <div ref={sectionRef} className={`transition-all duration-800 ${getAnimationClass()}`}>
      {children}
    </div>
  )
}
