"use client"

import { ScrollSection } from "@/components/layout/scroll-section"

const FEATURES = [
  {
    icon: "💬",
    title: "Weekly Live Q&As with Chris",
    description: "Get your personal questions answered in real-time"
  },
  {
    icon: "👥", 
    title: "Private Community of Like-Minded Souls",
    description: "Connect with others on the same spiritual path"
  },
  {
    icon: "🧘",
    title: "Exclusive Courses & Live Lessons",
    description: "Access guided sessions not available anywhere else"
  },
  {
    icon: "⚡",
    title: "Monthly & Weekly Growth Challenges",
    description: "Practical exercises to integrate spiritual wisdom"
  }
]

export function NextStepSection() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-900">
      {/* First Viewport - Centered CTA */}
      <div className="h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center w-full">
          <ScrollSection direction="fade">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-8 tracking-tight">
              Ready to Go Deeper?
            </h2>
          </ScrollSection>

          <ScrollSection direction="up" delay={200}>
            <p className="font-sans text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Our community is designed for implementation. Move into personalized guidance, live interaction, and a supportive spiritual tribe on your journey to spiritual expansion.
            </p>
          </ScrollSection>

          <ScrollSection direction="scale" delay={400}>
            <a
              href="/community"
              className="inline-block bg-amber-600 text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-magnetic
            >
              Join the Community →
            </a>
          </ScrollSection>
        </div>
      </div>

      {/* Second Part - Feature Cards - No top padding */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollSection direction="up">
            <div className="grid md:grid-cols-2 gap-8">
              {FEATURES.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  return (
    <ScrollSection direction="up" delay={300 + (index * 100)}>
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left hover:border-amber-600 transition-all duration-500">
        <div className="text-3xl mb-4">{feature.icon}</div>
        <h3 className="font-sans font-semibold text-xl text-white mb-3">
          {feature.title}
        </h3>
        <p className="font-sans text-gray-300 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </ScrollSection>
  )
}