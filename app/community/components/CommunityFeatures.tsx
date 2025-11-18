"use client"

import { ScrollSection } from "@/components/layout/ScrollSection"

const communityFeatures = [
  {
    title: "Weekly Live Calls",
    description: "Join me every week for deep-dive sessions on spiritual growth, health optimization, and shadow work integration.",
    icon: "🎥",
    frequency: "Every Tuesday",
  },
  {
    title: "Exclusive Courses",
    description: "Access comprehensive courses on carnivore nutrition, muscle building, consciousness expansion, and starseed awakening.",
    icon: "📚",
    frequency: "Monthly Releases",
  },
  {
    title: "Shadow Work Guidance",
    description: "Personalized support and group sessions for deep shadow integration and inner transformation work.",
    icon: "🌑",
    frequency: "Bi-weekly Sessions",
  },
]

export function CommunityFeatures() {
  return (
    <ScrollSection direction="stagger">
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Community Features</h2>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need for complete spiritual and physical transformation in one comprehensive platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {communityFeatures.map((feature, index) => (
              <ScrollSection key={index} direction="up" delay={index * 200}>
                <div
                  className="group bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-amber-600 transition-all duration-500 p-10"
                  data-magnetic
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-sans font-semibold rounded-full">
                    {feature.frequency}
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>
    </ScrollSection>
  )
}