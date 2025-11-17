"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/20 animate-pulse"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
        w-12 h-6 
        bg-black/20 backdrop-blur-xl 
        border border-white/10 
        shadow-2xl
        rounded-full
        flex items-center
        transition-all duration-300
        hover:bg-black/30
        hover:border-white/20
        hover:shadow-2xl
        group
        overflow-hidden
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Switch Track Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Light Mode Gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/10
          transition-all duration-500 ease-in-out
          ${theme === 'light' ? 'opacity-100' : 'opacity-0'}
        `}></div>
        
        {/* Dark Mode Gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/20
          transition-all duration-500 ease-in-out
          ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
        `}></div>
      </div>

      {/* Icons Container with Sliding Animation */}
      <div className="relative w-full h-full flex items-center justify-between px-1">
        {/* Sun Icon (Light Mode) */}
        <div className={`
          transition-all duration-500 ease-in-out transform
          ${theme === 'light' 
            ? 'opacity-100 scale-110 text-yellow-300' 
            : 'opacity-50 scale-90 text-white/60'
          }
          group-hover:scale-105
        `}>
          <svg 
            className="w-3 h-3" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="3.5" />
            <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <line x1="12" y1="3" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="21" />
              <line x1="5" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="19" y2="12" />
              <line x1="6.34" y1="6.34" x2="4.93" y2="4.93" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </g>
          </svg>
        </div>

        {/* Moon Icon (Dark Mode) */}
        <div className={`
          transition-all duration-500 ease-in-out transform
          ${theme === 'dark' 
            ? 'opacity-100 scale-110 text-blue-300' 
            : 'opacity-50 scale-90 text-white/60'
          }
          group-hover:scale-105
        `}>
          <svg 
            className="w-3 h-3" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              d="M9.37 3.51a7.99 7.99 0 1 0 11.12 11.12 9 9 0 0 1-11.12-11.12z" 
              fillRule="evenodd" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>

      {/* Sliding Knob */}
      <div className={`
        absolute top-0.5 bottom-0.5 w-5
        bg-white/30 backdrop-blur-sm
        border border-white/40
        rounded-full
        shadow-lg
        transition-all duration-500 ease-in-out
        ${theme === 'light' ? 'left-0.5' : 'left-6'}
        group-hover:bg-white/40
      `}></div>
    </button>
  )
}