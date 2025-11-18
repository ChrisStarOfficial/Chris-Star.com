"use client"

import { ScrollSection } from "@/components/layout/scroll-section"

interface CommunityNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function CommunityNavigation({ activeTab, setActiveTab }: CommunityNavigationProps) {
  const tabs = [
    { id: "features", label: "Features" },
    { id: "benefits", label: "Benefits" },
    { id: "testimonials", label: "Testimonials" },
  ]

  return (
    <ScrollSection direction="up">
      <section className="py-4 px-6 bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-lg px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                }`}
                data-magnetic
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </ScrollSection>
  )
}