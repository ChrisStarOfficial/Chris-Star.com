"use client"
import Image from 'next/image'

interface HeroSectionProps {
  isLoaded: boolean
  scrollY: number
}

export const HeroSection = ({ isLoaded, scrollY }: HeroSectionProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-amber-600 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.3}px) translateX(${scrollY * -0.1}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-amber-400 rounded-full blur-2xl"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      <div
        className={`text-center relative z-10 transition-all duration-1500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Image
            src="/Icon.png"
            alt="CSE"
            width={500}
            height={500}
            className="h-20 w-auto mx-auto"
            data-magnetic
          />
        </div>

        <h1
          className={`font-serif font-bold text-9xl text-white mb-0 tracking-h1 transition-all duration-1500 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
          style={{
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            lineHeight: "1.1",
          }}
        >
          CHRIS STAR
        </h1>

        <h2
          className={`font-sans font-bold text-5xl text-white mb-24 tracking-h2 transition-all duration-1500 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
          style={{
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            lineHeight: "1.1",
          }}
        >
          ENTERPRISES
        </h2>

        <p
          className={`font-sans font-light text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 transition-all duration-1500 delay-900 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Where optimization meets transformation.
        </p>
      </div>
    </section>
  )
}