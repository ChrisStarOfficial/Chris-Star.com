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
    <ScrollSection direction="up">
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
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

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {FEATURES.map((feature, index) => (
              <FeatureCard 
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>

          <ScrollSection direction="scale" delay={600}>
            <a
              href="/community"
              className="inline-block bg-amber-600 text-white px-12 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-magnetic
            >
              Join the Community →
            </a>
          </ScrollSection>
        </div>
      </section>
    </ScrollSection>
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