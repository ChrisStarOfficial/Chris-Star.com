import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans, Cinzel, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeWrapper } from "@/components/ThemeWrapper"
import { LoadingProvider } from "@/components/ui/LoadingContext"

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
  title: "Chris Star Enterprises: Where Optimization Meets Transformation",
  description: "Where optimization meets transformation.",
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${cinzel.variable} ${montserrat.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeWrapper>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeWrapper>
      </body>
    </html>
  )
}