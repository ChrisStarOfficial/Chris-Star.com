"use client"

import { useState, useEffect } from 'react' // 👈 Import hooks
// Assuming this imports the original ThemeProvider from next-themes, 
// as shown in your uploaded file:
import { ThemeProvider } from "next-themes" 

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  // 1. Create state to track if the component has mounted
  const [mounted, setMounted] = useState(false)

  // 2. Set mounted to true only on the client side after the initial render
  useEffect(() => {
    setMounted(true)
  }, [])

  // 3. If not mounted (server render), return only children, skipping the provider
  // This ensures the server output is simple and matches the initial client output
  if (!mounted) {
    return <>{children}</>
  }

  // 4. Once mounted, render the ThemeProvider
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}