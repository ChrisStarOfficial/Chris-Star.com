"use client"

import { ReactNode } from 'react'

interface OptionsGridProps {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export function OptionsGrid({ 
  children, 
  title, 
  subtitle, 
  className = "" 
}: OptionsGridProps) {
  return (
    <section className={`min-h-screen bg-gray-900 text-white relative overflow-hidden ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent" />
      </div>

      {/* Header - Fixed at top, disconnected from cards */}
      {(title || subtitle) && (
        <div className="relative z-10 pt-16 pb-8 text-center">
          {title && (
            <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-sans text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Cards Container - Absolutely centered in viewport */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-48 justify-items-center">
          {children}
        </div>
      </div>
    </section>
  )
}