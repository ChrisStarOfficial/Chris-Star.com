"use client"

import { useState } from "react"
import Link from "next/link"

const navigationItems = [
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "Authentic spiritual journey.",
    description: "Raw documentation of transformation and consciousness expansion",
    bgImage: "/modern-video-studio.png",
    color: "from-amber-500/20 to-amber-600/30",
    href: "/youtube",
  },
  {
    id: "community",
    title: "Community",
    subtitle: "Where transformation happens.",
    description: "Join my Skool community for real spiritual and physical optimization",
    bgImage: "/collaborative-design-space.png",
    color: "from-amber-600/20 to-amber-700/30",
    href: "/community",
  },
  {
    id: "vault",
    title: "Vault",
    subtitle: "Stellar information preserved.",
    description: "Complete Obsidian vault of Taygetan Disclosure transcripts",
    bgImage: "/elegant-design-library.png",
    color: "from-amber-500/15 to-amber-600/25",
    href: "/vault",
  },
  {
    id: "wiki",
    title: "Wiki",
    subtitle: "Community knowledge base.",
    description: "Collaborative wikis built from transcript source materials",
    bgImage: "/digital-library-interface.png",
    color: "from-amber-600/15 to-amber-700/25",
    href: "/wiki",
  },
  {
    id: "music",
    title: "Music",
    subtitle: "Spiritual soundscapes created.",
    description: "AI-assisted spiritual music exploring consciousness and awakening",
    bgImage: "/minimalist-music-studio.png",
    color: "from-amber-500/10 to-amber-600/20",
    href: "/music",
  },
]

export function NavigationGrid() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {navigationItems.map((item, index) => (
        <Link
          key={item.id}
          href={item.href}
          className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-2xl block ${
            index === 0 ? "md:col-span-2 lg:col-span-1" : ""
          } ${index === navigationItems.length - 1 && navigationItems.length % 3 === 1 ? "lg:col-start-2" : ""}`}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
            <img src={item.bgImage || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:opacity-90 transition-opacity duration-500`}
            ></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-500"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 h-80 flex flex-col justify-end text-white">
            <div className="transform transition-all duration-500 group-hover:-translate-y-3">
              <h3 className="font-serif font-bold text-3xl md:text-4xl mb-3 tracking-tight">{item.title}</h3>
              <p className="font-sans text-base opacity-90 mb-4 font-light">{item.subtitle}</p>

              {/* Description that appears on hover */}
              <div
                className={`transition-all duration-500 ${
                  hoveredItem === item.id ? "opacity-100 translate-y-0 max-h-24" : "opacity-0 translate-y-6 max-h-0"
                }`}
              >
                <p className="font-sans text-sm text-gray-200 leading-relaxed font-light">{item.description}</p>
              </div>
            </div>

            {/* Hover indicator */}
            <div
              className={`absolute bottom-6 right-6 w-12 h-12 border-2 border-white/60 rounded-full flex items-center justify-center transition-all duration-500 ${
                hoveredItem === item.id ? "scale-110 bg-amber-600/30 border-amber-400" : "scale-100"
              }`}
            >
              <svg
                className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Luxury accent line */}
          <div
            className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-700 ${
              hoveredItem === item.id ? "w-full" : "w-0"
            }`}
          ></div>

          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              hoveredItem === item.id ? "shadow-2xl shadow-amber-600/20" : ""
            }`}
          ></div>
        </Link>
      ))}
    </div>
  )
}
