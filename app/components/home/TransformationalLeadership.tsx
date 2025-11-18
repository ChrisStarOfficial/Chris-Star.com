"use client"
import { ScrollSection } from "@/components/layout/ScrollSection"

export const TransformationalLeadership = () => {
  const services = [
    {
      title: "Spiritual Leadership",
      desc: "Guiding starseeds, lightworkers, and spiritual people through massive transformation, with practical wisdom and spiritual depth.",
      icon: "👑🛡️",
    },
    {
      title: "Health Optimization",
      desc: "Learn and practically implement diet/nutrition, muscle building, circadian rhythm, and other optimizations, for peak physical, mental, and spiritual performance, to get the most out of life.",
      icon: "⚡💪",
    },
    {
      title: "Shadow Integration",
      desc: "Deep, integrative shadow work and inner transformation creates a permanent, long-term, lasting change—not fleeting motivation or a temporary adaptation.",
      icon: "🧩👤",
    },
  ]

  return (
    <section className="h-screen py-32 px-6 bg-gray-900 text-white relative overflow-hidden z-10">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center">
        <ScrollSection direction="fade" threshold={0.3}>
          <div className="text-center mb-20">
            <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">
              Transformational Leadership
            </h2>
            <h3 className="font-sans font-semibold text-2xl text-amber-400 mb-6 tracking-wide">
              Not just content creation.
            </h3>
            <p className="font-sans text-xl text-gray-400 leading-relaxed text-lg">
              As a public speaker, coach, and guide, I lead with real change—not just inspiration. Starseeds, lightworkers, and spiritual people alike: If you're ready to optimize your health, master your shadows, and become the best version of yourself—your journey starts here. You belong with us.
            </p>
          </div>
        </ScrollSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ScrollSection key={index} direction="up" delay={index * 200} threshold={0.4}>
              <div className="group h-full" data-magnetic>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-amber-600 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl h-full flex flex-col">                  <div className="text-4xl mb-6 flex-shrink-0">{service.icon}</div>
                  <h3 className="font-sans font-semibold text-2xl mb-6 text-white group-hover:text-amber-600 transition-colors flex-shrink-0">
                    {service.title}
                  </h3>
                  <p className="font-sans text-gray-400 leading-relaxed text-lg flex-grow">{service.desc}</p>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>
      </div>
    </section>
  )
}