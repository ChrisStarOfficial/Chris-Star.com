import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans } from "next/font/google"
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

export const metadata: Metadata = {
  title: "Chris Star Enterprises LLC - Where optimization meets transformation",
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
    <html lang="en" className={`${inter.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
