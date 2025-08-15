"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollTriggeredCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export function ScrollTriggeredCounter({
  end,
  duration = 1300, // Reduced from 2000ms to 1300ms (35% faster)
  suffix = "",
  prefix = "",
  decimals = 0,
}: ScrollTriggeredCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)

          const startTime = Date.now()
          const startValue = 0

          const animate = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)

            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const currentValue = startValue + (end - startValue) * easeOutCubic

            if (decimals > 0) {
              setCount(Math.round(currentValue * Math.pow(10, decimals)) / Math.pow(10, decimals))
            } else {
              setCount(Math.floor(currentValue))
            }

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [end, duration, hasStarted])

  return (
    <span ref={ref} className="font-sans font-bold">
      {" "}
      {/* Changed from font-serif to font-sans for consistency */}
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  )
}
