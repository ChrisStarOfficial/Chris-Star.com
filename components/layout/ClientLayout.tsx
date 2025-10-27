"use client"

import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { LoadingProvider } from '@/components/ui/LoadingContext'
import { usePathname } from "next/navigation"
import { HyperspaceEffect } from "@/components/archive/navigation/effects/HyperspaceEffect"
import { useState, useEffect } from "react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPath) {
      setIsNavigating(true);
      setPreviousPath(pathname);
      
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [pathname, previousPath]);
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LoadingProvider>
        {isNavigating && <HyperspaceEffect />}
        <div style={{ display: isNavigating ? 'none' : 'block' }}>
          {children}
        </div>
      </LoadingProvider>
    </ThemeProvider>
  )
}