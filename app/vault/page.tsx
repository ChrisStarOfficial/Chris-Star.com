"use client"

import { useState } from "react"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { CSLogoEasterEgg } from "@/components/cs-logo-easter-egg"

const vaultFeatures = [
  {
    id: "transcripts",
    title: "Complete Transcript Archive",
    description: "Full collection of Taygetan Disclosure transcripts organized and searchable",
    count: "500+",
    icon: "📜",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "obsidian",
    title: "Obsidian Vault Format",
    description: "Structured knowledge base with interconnected notes and cross-references",
    count: "Linked",
    icon: "🔗",
    color: "from-amber-600 to-amber-700",
  },
  {
    id: "updates",
    title: "Regular Updates",
    description: "Continuously updated with new transcripts and improved organization",
    count: "Weekly",
    icon: "🔄",
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "backup",
    title: "Backup & Archive",
    description: "Secure preservation of stellar information for future generations",
    count: "Permanent",
    icon: "💾",
    color: "from-amber-600 to-amber-800",
  },
]

const vaultSections = [
  {
    title: "Taygetan Contact Transcripts",
    category: "Primary Source",
    description: "Direct communications and conversations with Taygetan representatives providing stellar information.",
    type: "Obsidian Notes",
    entries: "200+",
    featured: true,
  },
  {
    title: "Cosmic Perspectives Archive",
    category: "Philosophical Content",
    description: "Deep discussions on consciousness, reality, and the nature of existence from stellar viewpoints.",
    type: "Linked Notes",
    entries: "150+",
    featured: true,
  },
  {
    title: "Technical Information Database",
    category: "Scientific Data",
    description: "Technical explanations of advanced concepts, technology, and cosmic phenomena.",
    type: "Structured Data",
    entries: "100+",
    featured: false,
  },
  {
    title: "Historical Context Collection",
    category: "Background Info",
    description: "Historical context and background information supporting the main disclosure content.",
    type: "Reference Material",
    entries: "75+",
    featured: true,
  },
]

export default function VaultPage() {
  const [activeSection, setActiveSection] = useState("all")

  const filteredSections = vaultSections.filter((section) => {
    return activeSection === "all" || section.category.toLowerCase().includes(activeSection)
  })

  return (
    <main className="min-h-screen bg-gray-900">
      <ScrollProgressIndicator />
      <MagneticCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-amber-600 rounded-full blur-3xl animate-parallax-float"></div>
          <div
            className="absolute bottom-20 right-10 w-60 h-60 bg-amber-500 rounded-full blur-3xl"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-32 h-32 bg-amber-400 rounded-full blur-2xl"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="text-center relative z-10 max-w-5xl mx-auto">
          <AdvancedScrollSection direction="fade">
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-2xl animate-luxury-glow mb-8">
                <span className="text-3xl">🌌</span>
              </div>
            </div>
            <h1 className="font-sans font-bold text-6xl md:text-8xl mb-8 tracking-tight">The Vault</h1>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-amber-400 mb-12 tracking-tight">
              Taygetan Disclosure Archive
            </h2>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="up" delay={300}>
            <p className="font-sans font-light text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Access the complete Obsidian transcript vault backup of the Taygetan Disclosure—a comprehensive archive of
              stellar information, cosmic perspectives, and advanced knowledge from our galactic contacts.
            </p>
            <p className="font-sans font-light text-lg text-amber-300 max-w-3xl mx-auto leading-relaxed mb-16">
              This meticulously organized knowledge base preserves crucial information for current and future
              generations seeking understanding of our cosmic reality.
            </p>
          </AdvancedScrollSection>

          <AdvancedScrollSection direction="scale" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <button
                className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg"
                data-magnetic
              >
                Explore Archive
              </button>
              <button
                className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                data-magnetic
              >
                Download Vault
              </button>
            </div>
          </AdvancedScrollSection>
        </div>
      </section>

      {/* Vault Features */}
      <AdvancedScrollSection direction="stagger">
        <section className="py-32 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Archive Features</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A comprehensive digital preservation system designed to maintain and organize stellar information for
                easy access and study.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {vaultFeatures.map((feature, index) => (
                <AdvancedScrollSection key={feature.id} direction="up" delay={index * 150}>
                  <div
                    className="group bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 overflow-hidden"
                    data-magnetic
                  >
                    <div className={`h-32 bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                      <span className="text-4xl">{feature.icon}</span>
                    </div>
                    <div className="p-8">
                      <h3 className="font-sans font-bold text-2xl text-white mb-3">{feature.title}</h3>
                      <p className="font-sans text-gray-300 leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm text-amber-400 font-semibold">{feature.count}</span>
                        <svg
                          className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Archive Sections */}
      <AdvancedScrollSection direction="left">
        <section className="py-32 px-6 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Archive Sections</h2>
              <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Organized collections of transcripts and information, structured for easy navigation and cross-reference
                within the Obsidian knowledge base.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {filteredSections.map((section, index) => (
                <AdvancedScrollSection key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 200}>
                  <div
                    className="group bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 overflow-hidden"
                    data-magnetic
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-sans font-semibold rounded-full">
                          {section.category}
                        </span>
                        {section.featured && (
                          <span className="inline-block px-3 py-1 bg-amber-600 text-white text-sm font-sans font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-sans font-bold text-2xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {section.title}
                      </h3>
                      <p className="font-sans text-gray-300 leading-relaxed mb-6">{section.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="font-sans">{section.type}</span>
                          <span>•</span>
                          <span className="font-sans">{section.entries} entries</span>
                        </div>
                        <button className="bg-amber-600 text-white px-6 py-2 rounded-lg font-sans font-semibold hover:bg-amber-700 transition-colors duration-300">
                          Browse
                        </button>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollSection>
              ))}
            </div>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* GitHub Repository CTA */}
      <AdvancedScrollSection direction="scale">
        <section className="py-32 px-6 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
            <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">Access the Repository</h2>
            <p className="font-sans text-xl leading-relaxed mb-12 opacity-90 max-w-3xl mx-auto">
              Download the complete Obsidian vault from our GitHub repository. Get updates, contribute improvements, and
              help preserve this important stellar information for humanity.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                className="bg-white text-amber-600 px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg flex items-center space-x-3"
                data-magnetic
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Visit GitHub Repository</span>
              </button>
              <button
                className="border-2 border-white text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300"
                data-magnetic
              >
                Learn More
              </button>
            </div>
            <p className="font-sans text-sm opacity-75 mt-8">
              Repository link will be made public soon. Stay tuned for updates.
            </p>
          </div>
        </section>
      </AdvancedScrollSection>

      {/* Footer */}
      <footer className="py-20 px-6 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <CSLogoEasterEgg className="mx-auto mb-10" />
          <p className="font-sans text-gray-400 mb-6 text-lg">
            Copyright © 2025 Chris Star Enterprises LLC. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full mx-4"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>
        </div>
      </footer>
    </main>
  )
}
