"use client"

import { useEffect, useRef } from "react"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
      cursorDot.style.left = e.clientX + "px"
      cursorDot.style.top = e.clientY + "px"
    }

    const handleMouseEnter = () => {
      cursor.style.transform = "scale(1.5)"
      cursor.style.backgroundColor = "rgba(217, 119, 6, 0.2)"
    }

    const handleMouseLeave = () => {
      cursor.style.transform = "scale(1)"
      cursor.style.backgroundColor = "rgba(217, 119, 6, 0.1)"
    }

    document.addEventListener("mousemove", moveCursor)

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll("[data-magnetic]")
    magneticElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      magneticElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 bg-amber-600/10 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-amber-600 rounded-full pointer-events-none z-50"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
