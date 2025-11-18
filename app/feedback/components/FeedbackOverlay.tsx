"use client"

import type React from "react"
import { ReactNode } from "react"

interface GlassOverlayProps {
  children: ReactNode
  className?: string
  backgroundImage?: string
  overlayOpacity?: number
  blurIntensity?: string
}

export default function GlassOverlay({
  children,
  className = "",
  backgroundImage = "/fractal-glass-background.jpg",
  overlayOpacity = 20,
  blurIntensity = "xl",
}: GlassOverlayProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className={`bg-black/${overlayOpacity} absolute inset-0`} />
      {children}
    </div>
  )
}

// GlassPanel component for the content area
interface GlassPanelProps {
  children: ReactNode
  className?: string
  width?: string
  maxWidth?: string
}

export function GlassPanel({
  children,
  className = "",
  width = "800px",
  maxWidth = "800px",
}: GlassPanelProps) {
  return (
    <div
      className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-700 ease-out ${className}`}
      style={{
        width,
        maxWidth,
      }}
    >
      {children}
    </div>
  )
}