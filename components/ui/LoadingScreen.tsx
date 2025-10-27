// components/ui/LoadingScreen.tsx
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface LoadingScreenProps {
  loadingProgress: number
  message?: string
  variant?: 'default' | 'hyperspace' | 'minimal'
}

export const LoadingScreen = ({ 
  loadingProgress, 
  message = "LOADING",
  variant = 'default'
}: LoadingScreenProps) => {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${loadingProgress}%`
    }
  }, [loadingProgress])

  if (variant === 'minimal') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <motion.div
              className="text-white text-lg font-light tracking-widest"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message}
            </motion.div>
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              />
            </div>
            <div className="text-white/60 text-sm font-mono">
              {Math.round(loadingProgress)}%
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (variant === 'hyperspace') {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Your existing hyperspace effect */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: 0.1,
                opacity: 0,
              }}
              animate={{
                scale: [0.1, 1, 2, 3],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Loading content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 z-10">
            <motion.div
              className="text-white text-2xl font-light tracking-widest"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message}
            </motion.div>
            <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ width: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              />
            </div>
            <div className="text-white/60 text-sm font-mono">
              {Math.round(loadingProgress)}%
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant (your enhanced cinematic loading screen)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex items-center justify-center overflow-hidden"
      >
        {/* Your enhanced cinematic loading screen code from previous response */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -20, 20, 0],
                x: [null, 10, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-2xl px-8">
          <div className="flex flex-col items-center justify-center space-y-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                className="text-white text-4xl font-light tracking-widest mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(59,130,246,0.5)",
                    "0 0 30px rgba(168,85,247,0.5)",
                    "0 0 20px rgba(59,130,246,0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {message}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/60 text-sm font-mono mt-2"
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </motion.div>

            <div className="w-full space-y-4">
              <div className="relative">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 relative"
                    initial={{ width: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-1/2 h-full bg-white/30"
                      animate={{ x: ["0%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}