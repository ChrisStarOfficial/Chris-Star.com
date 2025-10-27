"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

interface LoadingContextType {
  startLoading: (message?: string) => void
  updateProgress: (progress: number) => void
  stopLoading: () => void
  isLoading: boolean
  progress: number
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("LOADING")

  const startLoading = useCallback((customMessage?: string) => {
    setIsLoading(true)
    setProgress(0)
    setMessage(customMessage || "LOADING")
  }, [])

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)))
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setProgress(100)
    // Small delay to show 100% before hiding
    setTimeout(() => setProgress(0), 300)
  }, [])

  return (
    <LoadingContext.Provider value={{
      startLoading,
      updateProgress,
      stopLoading,
      isLoading,
      progress
    }}>
      {children}
      {isLoading && (
        <LoadingScreen 
          loadingProgress={progress} 
          message={message}
        />
      )}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}