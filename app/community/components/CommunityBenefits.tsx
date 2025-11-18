// components/community/CommunityBenefits.tsx
"use client"

import { ScrollSection } from "@/components/layout/ScrollSection"

const communityBenefits = [
  {
    title: "Transformational Community",
    description: "Connect with like-minded lightworkers, starseeds, and spiritual seekers on the path of authentic growth.",
    value: "Priceless Network",
  },
  {
    title: "Direct Access to Chris",
    description: "Get personal guidance and answers to your questions during live calls and community discussions.",
    value: "1-on-1 Support",
  },
  {
    title: "Comprehensive Resources",
    description: "Access to all courses, guides, meal plans, workout routines, and spiritual practices in one place.",
    value: "$2000+ Value",
  },
  {
    title: "Accountability Partners",
    description: "Find your tribe and create lasting accountability partnerships for your health and spiritual journey.",
    value: "Lifelong Bonds",
  },
]

export function CommunityBenefits() {
  return (
    <ScrollSection direction="left">
      <section className="py-32 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sans font-bold text-5xl text-white mb-6 tracking-tight">Member Benefits</h2>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join a community designed for real transformation, not just inspiration. Get everything you need to
              optimize your health and expand your consciousness.
            </p>
          </div>

          <div className="space-y-8">
            {communityBenefits.map((benefit, index) => (
              <ScrollSection key={index} direction="right" delay={index * 150}>
                <div
                  className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:border-amber-600 transition-all duration-500 overflow-hidden"
                  data-magnetic
                >
                  <div className="p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="font-sans font-bold text-3xl text-white mb-4">{benefit.title}</h3>
                        <p className="font-sans text-lg text-gray-300 leading-relaxed">{benefit.description}</p>
                      </div>
                      <div className="mt-6 md:mt-0 md:ml-8">
                        <span className="inline-block px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-sans font-semibold">
                          {benefit.value}
                        </span>
                      </div>
                    </div>
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