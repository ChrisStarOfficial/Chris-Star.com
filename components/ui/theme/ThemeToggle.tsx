"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-13 h-6 rounded-full bg-white/[0.03] backdrop-blur-[40px] border border-white/20 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-white/20 animate-pulse" />
      </div>
    )
  }

  const isLight = theme === 'light'

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="
        relative w-10 h-6
        rounded-full
        transition-all duration-300 ease-out
        hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2
        mt-1
      "
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {/* Layer 1: Base glass layer */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-350 ease-out"
        style={{
          background: isLight 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(230, 185, 61, 0.25) 0%, rgba(230, 185, 61, 0.18) 50%, rgba(230, 185, 61, 0.12) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Layer 3: Glass border */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-350"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.4)',
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 6px 32px rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Layer 4: Hover glow */}
      {isHover && (
        <div 
          className="absolute inset-0 rounded-full transition-opacity duration-350"
          style={{
            background: isLight 
              ? 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15), transparent 70%)'
              : 'radial-gradient(circle at 80% 50%, rgba(230, 185, 61, 0.25), transparent 70%)',
            opacity: 0.7,
          }}
        />
      )}

      {/* THE KNOB - Larger, centered, with identical white gradient outline */}
      <div 
        className={`
          absolute top-0 w-6 h-6
          rounded-full
          transition-all duration-350 ease-out
          ${isLight ? 'left-0' : 'left-4'}
        `}
        style={{
          transform: isHover ? 'scale(1.05)' : 'scale(1)',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: `
            0 4px 24px rgba(0, 0, 0, 0.15),
            0 2px 6px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
        }}
      />
    </button>
  )
}