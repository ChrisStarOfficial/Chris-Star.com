"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans, Cinzel, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import "./globals.css"
import { LoadingProvider } from '@/components/ui/LoadingContext'
import { usePathname } from "next/navigation"
import { HyperspaceEffect } from "@/components/archive/navigation/effects/HyperspaceEffect"
import { useState, useEffect } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-dm-sans",
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "Chris Star Enterprises - Where optimization meets transformation",
  description: "Modern, luxurious business solutions crafted by Chris Star for discerning clients who demand excellence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPath) {
      setIsNavigating(true);
      setPreviousPath(pathname);
      
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 3000); // Show effect for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [pathname, previousPath]);
  
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${cinzel.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
        {isNavigating && <HyperspaceEffect />}
        <div className={isNavigating ? 'opacity-0' : 'opacity-100'}>
          {children}
        </div>
      </body>
    </html>
  )
}