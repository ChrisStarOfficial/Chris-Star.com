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
    <section className={`min-h-screen py-12 px-6 bg-gray-900 text-white relative overflow-hidden ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col">
        {/* Header - Stays at top */}
        {(title || subtitle) && (
          <div className="text-center mb-16 pt-8"> {/* Added pt-8 for top padding */}
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
        
        {/* Cards Container - Centered vertically */}
        <div className="flex-grow flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}