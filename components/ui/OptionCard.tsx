"use client"

import { useState } from 'react'
import Link from 'next/link'

interface OptionCardProps {
  title: string
  description: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
}

export function OptionCard({ 
  title, 
  description, 
  href, 
  onClick, 
  icon,
  className = ""
}: OptionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Square Card Container - Smooth scale without bounce */}
      <div
        className={`
          relative w-48 h-48 bg-black/20 backdrop-blur-xl rounded-2xl 
          border border-white/10 cursor-pointer transition-all duration-500 ease-out
          group flex items-center justify-center overflow-hidden
          ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100 shadow-lg'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl" />
        
        {/* Gold Glow Effect */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-amber-600/20 
          border-2 border-amber-400/40 transition-all duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
        
        {/* Icon Container */}
        <div className="relative z-10 w-3/4 h-3/4 transition-transform duration-500 ease-out flex items-center justify-center">
          {icon || (
            <div className="text-amber-400/80 group-hover:text-amber-300 text-5xl">
              ⚡
            </div>
          )}
        </div>
      </div>

      {/* Text Content Below Card */}
      <div className="text-center space-y-2 max-w-48">
        {/* Title */}
        <h3 className="text-white font-sans text-lg font-bold tracking-wide">
          {title}
        </h3>
        
        {/* Description - appears on hover */}
        <div className={`
          text-gray-300/90 text-sm font-light leading-relaxed transition-all duration-500 overflow-hidden
          ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          {description}
        </div>
      </div>
    </div>
  )

  // Wrap with Link if href provided, otherwise use button
  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}