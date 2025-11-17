"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
        w-14 h-7 
        bg-black/20 backdrop-blur-xl
        border border-white/10
        rounded-full
        shadow-xl
        transition-all duration-300
        hover:border-white/20
        hover:bg-black/30
        hover:shadow-2xl
        group
        overflow-hidden
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Colored background that shows through glassmorphism */}
      <div className={`
        absolute inset-0 rounded-full
        transition-all duration-500
        ${theme === 'light' 
          ? 'bg-electric/30' 
          : 'bg-luminance/30'
        }
        group-hover:opacity-80
      `}></div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md"></div>

      {/* Sun Icon - Always visible but moves */}
      <div className={`
        absolute top-1/2 transform -translate-y-1/2
        transition-all duration-500 ease-in-out
        ${theme === 'light' 
          ? 'left-2 opacity-100 scale-100' 
          : 'left-9 opacity-40 scale-90 -translate-x-1'
        }
        group-hover:scale-110
      `}>
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Moon Icon - Always visible but moves */}
      <div className={`
        absolute top-1/2 transform -translate-y-1/2
        transition-all duration-500 ease-in-out
        ${theme === 'dark' 
          ? 'right-2 opacity-100 scale-100' 
          : 'right-9 opacity-40 scale-90 translate-x-1'
        }
        group-hover:scale-110
      `}>
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path 
            d="M9.37 3.51a7.99 7.99 0 1 0 11.12 11.12 9 9 0 0 1-11.12-11.12z" 
            fillRule="evenodd" 
            clipRule="evenodd" 
          />
        </svg>
      </div>

      {/* Glassmorphism Knob - Dark theme style */}
      <div className={`
        absolute top-1 bottom-1 w-6
        bg-black/40 backdrop-blur-xl
        border border-white/20
        rounded-full
        shadow-2xl
        transition-all duration-500 ease-in-out
        flex items-center justify-center
        ${theme === 'light' ? 'left-1' : 'left-7'}
        group-hover:bg-black/50
        group-hover:border-white/30
        group-hover:shadow-2xl
      `}>
        {/* Mini accent dot that changes color */}
        <div className={`
          w-1 h-1 rounded-full
          transition-all duration-300
          ${theme === 'light' 
            ? 'bg-electric' 
            : 'bg-luminance'
          }
          group-hover:scale-150
          group-hover:opacity-100
        `}></div>
      </div>

      {/* Electric pulse effect on active state */}
      <div className={`
        absolute inset-0 rounded-full
        transition-all duration-300
        ${theme === 'light' 
          ? 'bg-electric/10' 
          : 'bg-luminance/10'
        }
        group-hover:opacity-100
        opacity-0
      `}></div>
    </button>
  )
}