import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans, Cinzel, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider" // Import your ThemeProvider
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ["400", "700", "900"],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Chris Star Enterprises - Where optimization meets transformation",
  description:
    "Modern, luxurious business solutions crafted by Chris Star for discerning clients who demand excellence.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${cinzel.variable} ${montserrat.variable} antialiased`}
      suppressHydrationWarning // Add this to prevent hydration errors
    >
      <head>
        <meta name="darkreader" content="none" />
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark light" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}