"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AdvancedScrollSection } from "@/components/advanced-scroll-section"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { ScrollTriggeredCounter } from "@/components/scroll-triggered-counter"

export default function HomePage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showPerimeter, setShowPerimeter] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)

  const navigationCards = [
    {
      id: "youtube",
      title: "YouTube",
      subtitle: "Spiritual Journey",
      description: "Long-form authentic content exploring consciousness, transformation, and spiritual awakening",
      href: "/youtube",
      color: "from-red-500/20 to-red-600/30",
      borderColor: "border-red-500/40",
      glowColor: "shadow-red-500/20",
    },
    {
      id: "community",
      title: "Community",
      subtitle: "Skool Platform",
      description: "Join our transformational community with weekly calls, courses, and spiritual guidance",
      href: "/community",
      color: "from-amber-500/20 to-amber-600/30",
      borderColor: "border-amber-500/40",
      glowColor: "shadow-amber-500/20",
    },
    {
      id: "vault",
      title: "Vault",
      subtitle: "Taygetan Archive",
      description: "Comprehensive Obsidian vault of transcribed Taygetan disclosure materials and insights",
      href: "/vault",
      color: "from-purple-500/20 to-purple-600/30",
      borderColor: "border-purple-500/40",
      glowColor: "shadow-purple-500/20",
    },
    {
      id: "wiki",
      title: "Wiki",
      subtitle: "Knowledge Base",
      description: "Community-driven wiki project with comprehensive spiritual and consciousness resources",
      href: "/wiki",
      color: "from-blue-500/20 to-blue-600/30",
      borderColor: "border-blue-500/40",
      glowColor: "shadow-blue-500/20",
    },
    {
      id: "music",
      title: "Music",
      subtitle: "Suno AI Creations",
      description: "AI-generated spiritual songs and compositions for meditation, healing, and transformation",
      href: "/music",
      color: "from-green-500/20 to-green-600/30",
      borderColor: "border-green-500/40",
      glowColor: "shadow-green-500/20",
    },
  ]

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId)
    // Auto-navigate after a short delay for better UX
    setTimeout(() => {
      const card = navigationCards.find((c) => c.id === cardId)
      if (card) {
        router.push(card.href)
      }
    }, 500)
  }

  const handleNavigate = () => {
    if (selectedCard) {
      const card = navigationCards.find((c) => c.id === selectedCard)
      if (card) {
        router.push(card.href)
      }
    }
  }

  const handleGoBack = () => {
    setSelectedCard(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (navigationRef.current) {
        const rect = navigationRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8
        setShowPerimeter(isVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      <ScrollProgressIndicator />
      <MagneticCursor />

      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-20 left-10 w-32 h-32 bg-amber-600 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.3}px) translateX(${scrollY * -0.1}px)` }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-amber-400 rounded-full blur-2xl"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }}
          ></div>
        </div>

        <div
          ref={heroRef}
          className={`text-center relative z-10 transition-all duration-1500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            className={`mb-12 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div
              className="h-20 mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center shadow-2xl animate-luxury-glow w-[235px]"
              data-magnetic
            >
              <span className="text-white font-sans font-bold text-2xl">Introducing...</span>
            </div>
          </div>

          <h1
            className={`font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight transition-all duration-1500 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              lineHeight: "1.1",
            }}
          >
            Chris Star Enterprises LLC
          </h1>

          <p
            className={`font-sans font-light text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 transition-all duration-1500 delay-900 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Where optimization meets transformation.
          </p>

          <div
            className={`flex items-center justify-center mt-16 transition-all duration-1500 delay-1200 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full mx-4 animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-amber-600 rounded-full flex justify-center" data-magnetic>
              <div className="w-1.5 h-4 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-3 font-sans text-center">Scroll to explore</p>
        </div>
      </section>

      <section
        ref={navigationRef}
        className="py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0">
          {/* Advanced geometric grid with mathematical precision */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(148, 163, 184, 0.02) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(148, 163, 184, 0.015) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(148, 163, 184, 0.008) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(148, 163, 184, 0.008) 1px, transparent 1px),
                  linear-gradient(45deg, rgba(148, 163, 184, 0.004) 1px, transparent 1px),
                  linear-gradient(-45deg, rgba(148, 163, 184, 0.004) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px, 120px 120px, 40px 40px, 40px 40px, 80px 80px, 80px 80px",
                backgroundPosition: "0 0, 40px 40px, 0 0, 0 0, 0 0, 0 0",
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            />
          </div>

          {/* Large central mandala inspired by sacred geometry */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.012]">
            <div className="relative w-[800px] h-[800px]">
              {/* Multiple concentric circles with Destiny 2 styling */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-slate-300/4 rounded-full"
                  style={{
                    inset: `${i * 50}px`,
                    animation: `geo-rotate ${120 + i * 30}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                    clipPath:
                      i % 2 === 0
                        ? "polygon(0% 0%, 100% 0%, 100% 30%, 70% 30%, 70% 70%, 100% 70%, 100% 100%, 0% 100%)"
                        : "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 70%, 30% 70%)",
                  }}
                />
              ))}

              {/* Radial lines creating sacred geometry patterns */}
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-96 h-px bg-slate-300/3 origin-left"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                  }}
                />
              ))}

              {/* Hexagonal patterns at key positions */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-24 h-24 border border-slate-300/6"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-200px)`,
                    clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                    animation: `geo-rotate ${180 + i * 40}s linear infinite`,
                  }}
                />
              ))}

              {/* Central complex geometric pattern */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-48 h-48">
                  {/* Interlocking triangles */}
                  <div
                    className="absolute inset-0 border border-slate-300/8"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                      animation: "geo-rotate 300s linear infinite",
                    }}
                  />
                  <div
                    className="absolute inset-0 border border-slate-300/8 rotate-180"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                      animation: "geo-rotate 300s linear infinite reverse",
                    }}
                  />

                  {/* Central hexagon with inner patterns */}
                  <div
                    className="absolute top-1/2 left-1/2 w-16 h-16 border border-slate-300/12 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                      animation: "geo-pulse 20s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating geometric elements with scroll parallax */}
          <div className="absolute inset-0 opacity-[0.008]">
            {/* Corner geometric patterns */}
            <div
              className="absolute top-32 left-32 w-64 h-64 border border-slate-300/6"
              style={{
                clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                animation: "geo-float 200s ease-in-out infinite",
                transform: `translateY(${scrollY * 0.02}px) translateX(${scrollY * 0.01}px)`,
              }}
            />
            <div
              className="absolute top-32 right-32 w-48 h-48 border border-slate-300/4"
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                animation: "geo-rotate 180s linear infinite reverse",
                transform: `translateY(${scrollY * -0.015}px) translateX(${scrollY * -0.02}px)`,
              }}
            />
            <div
              className="absolute bottom-32 left-32 w-56 h-56 border border-slate-300/5"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                animation: "geo-pulse 160s ease-in-out infinite",
                transform: `translateY(${scrollY * 0.025}px) translateX(${scrollY * 0.015}px)`,
              }}
            />
            <div
              className="absolute bottom-32 right-32 w-40 h-40 border border-slate-300/7"
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                animation: "geo-rotate 140s linear infinite",
                transform: `translateY(${scrollY * -0.02}px) translateX(${scrollY * -0.01}px)`,
              }}
            />
          </div>

          {/* Advanced scanning effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300/4 to-transparent"
              style={{
                animation: "geo-scan 100s linear infinite",
              }}
            />
            <div
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-300/3 to-transparent"
              style={{
                animation: "geo-scan-vertical 120s linear infinite",
                animationDelay: "25s",
              }}
            />
            <div
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300/2 to-transparent"
              style={{
                animation: "geo-scan 80s linear infinite",
                animationDelay: "40s",
                top: "75%",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <AdvancedScrollSection direction="fade" threshold={0.2}>
              <div className="text-center mb-20">
                <div className="relative mb-16">
                  <div
                    className={`absolute transition-all duration-3000 ease-out border border-slate-300/12 bg-gradient-to-r from-slate-500/2 via-slate-400/3 to-slate-500/2 backdrop-blur-xl shadow-2xl shadow-slate-500/5 ${
                      showPerimeter
                        ? "inset-0 rounded-3xl"
                        : "top-[60px] bottom-[60px] left-[45%] right-[45%] rounded-xl"
                    }`}
                    style={{
                      clipPath: showPerimeter
                        ? "polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0% calc(100% - 40px), 0% 40px)"
                        : "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)",
                    }}
                  />

                  {/* Destiny 2 inspired corner elements */}
                  <div
                    className={`absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-slate-300/15 transition-opacity duration-1000 ${
                      showPerimeter ? "opacity-100 delay-1000" : "opacity-0"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 80% 20%, 20% 20%, 20% 80%, 0% 100%)",
                      borderImage: "linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)) 1",
                    }}
                  />
                  <div
                    className={`absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-slate-300/15 transition-opacity duration-1000 ${
                      showPerimeter ? "opacity-100 delay-1200" : "opacity-0"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 80% 80%, 80% 20%, 20% 20%)",
                      borderImage: "linear-gradient(45deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)) 1",
                    }}
                  />
                  <div
                    className={`absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-slate-300/15 transition-opacity duration-1000 ${
                      showPerimeter ? "opacity-100 delay-1400" : "opacity-0"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, 20% 20%, 20% 80%, 80% 80%, 100% 100%, 0 100%)",
                      borderImage: "linear-gradient(225deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)) 1",
                    }}
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-slate-300/15 transition-opacity duration-1000 ${
                      showPerimeter ? "opacity-100 delay-1600" : "opacity-0"
                    }`}
                    style={{
                      clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 100% 100%, 100% 0, 0 0)",
                      borderImage: "linear-gradient(315deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)) 1",
                    }}
                  />

                  <div className="relative px-12 py-10">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
                      <div
                        className="mx-6 px-8 py-3 border border-slate-300/20 bg-gradient-to-r from-slate-400/8 to-slate-400/8 backdrop-blur-sm"
                        style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
                      >
                        <span className="text-slate-300 font-sans text-xs tracking-[0.25em] font-light">
                          ◊ NAVIGATION SEGMENT ACTIVE ◊
                        </span>
                      </div>
                      <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
                    </div>

                    <div className="flex items-center justify-center space-x-12 mb-8">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 bg-emerald-400/80 shadow-sm shadow-emerald-400/20"
                          style={{
                            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            animation: "pulse 4s ease-in-out infinite",
                          }}
                        />
                        <span
                          className="text-emerald-300/90 text-xs font-sans tracking-wider font-light"
                          style={{ animation: "pulse 4s ease-in-out infinite" }}
                        >
                          JUMP DRIVE READY
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 bg-sky-400/80 shadow-sm shadow-sky-400/20"
                          style={{
                            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            animation: "pulse 4s ease-in-out infinite",
                            animationDelay: "0.5s",
                          }}
                        />
                        <span
                          className="text-sky-300/90 text-xs font-sans tracking-wider font-light"
                          style={{ animation: "pulse 4s ease-in-out infinite", animationDelay: "0.5s" }}
                        >
                          FREQUENCY MAP LOCATED
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 bg-rose-400/80 shadow-sm shadow-rose-400/20"
                          style={{
                            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            animation: "pulse 2.5s ease-in-out infinite",
                            animationDelay: "1s",
                          }}
                        />
                        <span
                          className="text-rose-300/90 text-xs font-sans tracking-wider font-light"
                          style={{ animation: "pulse 2.5s ease-in-out infinite", animationDelay: "1s" }}
                        >
                          ENTER STAR CHART COORDINATES
                        </span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                        <div
                          className="mx-4 px-6 py-2 border border-amber-300/25 bg-gradient-to-r from-amber-400/8 to-amber-500/8 backdrop-blur-sm"
                          style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
                        >
                          <span className="text-amber-300/95 font-sans text-xs tracking-[0.2em] font-light">
                            ◊ STATUS REPORT ◊
                          </span>
                        </div>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-slate-300/90 text-xs font-sans tracking-wide font-light">
                          <span className="font-medium">ENGINES IN OPERATION:</span> 4/4, ELECTROMAGNETIC PLASMA JET
                        </span>
                        <span className="text-slate-300/90 text-xs font-sans tracking-wide font-light">
                          <span className="font-medium">SHIELD TOROID:</span> ACTIVE, ON OVERDRIVE
                        </span>
                        <span className="text-slate-300/90 text-xs font-sans tracking-wide font-light">
                          <span className="font-medium">ALERT SIGNAL:</span> GREEN ALERT
                        </span>
                        <span className="text-slate-300/90 text-xs font-sans tracking-wide font-light">
                          <span className="font-medium">LATEST ANNOUNCEMENT:</span> JUMP IMMINENT
                        </span>
                        <span className="text-slate-300/90 text-xs font-sans tracking-wide font-light">
                          <span className="font-medium">ARSENAL:</span> READY, ON STANDBY
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-px h-8 bg-gradient-to-t from-slate-300/8 via-slate-300/20 to-slate-300/8"
                          style={{
                            animation: "data-stream 12s ease-in-out infinite",
                            animationDelay: `${i * 0.8}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`relative mb-8 transition-all duration-1000 ${
                    showPerimeter ? "opacity-100 translate-y-0 delay-2200" : "opacity-0 translate-y-8"
                  }`}
                >
                  <h2
                    className="font-sans font-light text-4xl md:text-6xl text-white tracking-[0.3em] relative z-20 mb-4"
                    style={{
                      textShadow: "0 0 30px rgba(148, 163, 184, 0.15), 0 0 60px rgba(148, 163, 184, 0.08)",
                      filter: "drop-shadow(0 0 8px rgba(148, 163, 184, 0.1))",
                      animation: "title-glow-strobe 12s ease-in-out infinite, title-text-fade 12s ease-in-out infinite",
                    }}
                  >
                    ⟨ NAVIGATION ⟩
                  </h2>

                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1 h-px bg-slate-300/40" style={{ animationDelay: `${i * 0.3}s` }} />
                    ))}
                  </div>
                </div>

                <div
                  className={`relative transition-all duration-1000 ${
                    showPerimeter ? "opacity-100 translate-y-0 delay-2400" : "opacity-0 translate-y-8"
                  }`}
                >
                  <p className="font-sans text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed mb-12 tracking-wide font-light">
                    <span className="text-slate-300/60" style={{ animation: "pulse 20s ease-in-out infinite" }}>
                      ▶
                    </span>{" "}
                    {showNavigation ? "Click on a destination below to navigate" : "Click the navigation button above to reveal destinations"}{" "}
                    <span
                      className="text-slate-300/60"
                      style={{ animationDelay: "10s", animation: "pulse 20s ease-in-out infinite" }}
                    >
                      ◀
                    </span>
                  </p>

                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent mx-auto" />
                </div>

                <div
                  className={`flex items-center justify-center mt-12 transition-all duration-1000 ${
                    showPerimeter ? "opacity-100 scale-100 delay-2600" : "opacity-0 scale-75"
                  }`}
                >
                  <div className="relative">
                    {/* Multiple orbital rings with Destiny 2 aesthetic */}
                    <div
                      className="absolute inset-0 w-24 h-24 border border-slate-300/10 rounded-full"
                      style={{
                        animation: "geo-rotate 60s linear infinite",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 30%, 70% 30%, 70% 70%, 100% 70%, 100% 100%, 0% 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-1 w-22 h-22 border border-slate-300/12 rounded-full"
                      style={{
                        animation: "geo-rotate 45s linear infinite reverse",
                        clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 70%, 30% 70%)",
                      }}
                    />
                    <div
                      className="absolute inset-2 w-20 h-20 border border-slate-300/8 rounded-full"
                      style={{
                        animation: "geo-rotate 75s linear infinite",
                        clipPath: "polygon(0% 0%, 70% 0%, 70% 30%, 30% 30%, 30% 70%, 70% 70%, 70% 100%, 0% 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-3 w-18 h-18 border border-slate-300/6 rounded-full"
                      style={{
                        animation: "geo-rotate 35s linear infinite reverse",
                        clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)",
                      }}
                    />

                    <button
                      onClick={() => setShowNavigation(!showNavigation)}
                      className="relative w-24 h-24 border border-slate-300/20 rounded-full bg-gradient-to-br from-slate-400/5 via-slate-400/8 to-slate-400/5 backdrop-blur-sm shadow-lg shadow-slate-400/8 hover:border-slate-200/30 hover:shadow-slate-300/12 transition-all duration-700 group cursor-pointer"
                      style={{
                        boxShadow: "0 0 30px rgba(148, 163, 184, 0.06), inset 0 0 20px rgba(148, 163, 184, 0.02)",
                      }}
                      data-magnetic
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 w-8 h-px bg-slate-300/70 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${showNavigation ? "rotate-45" : ""}`}
                      />
                      <div
                        className={`absolute top-1/2 left-1/2 w-px h-8 bg-slate-300/70 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${showNavigation ? "-rotate-45" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </AdvancedScrollSection>

            {showNavigation && (
              <AdvancedScrollSection direction="stagger" threshold={0.3} delay={300}>
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {navigationCards.map((card, index) => (
                      <div
                        key={card.id}
                        onClick={() => handleCardSelect(card.id)}
                        className={`group cursor-pointer transition-all duration-500 ${
                          selectedCard === card.id
                            ? "scale-110 z-20"
                            : selectedCard
                              ? "scale-95 opacity-50"
                              : "hover:scale-105"
                        }`}
                        data-magnetic
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`relative bg-gradient-to-br ${card.color} backdrop-blur-lg border ${card.borderColor} rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-xl ${card.glowColor} ${
                            selectedCard === card.id ? "ring-2 ring-cyan-400/25 shadow-xl shadow-cyan-400/8" : ""
                          }`}
                          style={{
                            clipPath:
                              "polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)",
                          }}
                        >
                          {/* Destiny 2 inspired corner brackets */}
                          <div
                            className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-slate-300/25"
                            style={{ clipPath: "polygon(0 0, 100% 0, 75% 25%, 25% 25%, 25% 75%, 0 100%)" }}
                          />
                          <div
                            className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-slate-300/25"
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 75%, 25% 75%, 25% 25%)" }}
                          />
                          <div
                            className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-slate-300/25"
                            style={{ clipPath: "polygon(0 0, 25% 25%, 25% 75%, 75% 75%, 100% 100%, 0 100%)" }}
                          />
                          <div
                            className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-slate-300/25"
                            style={{ clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 100% 100%, 100% 0, 0 0)" }}
                          />

                          {/* Scanning line effect */}
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                            <div
                              className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300/15 to-transparent"
                              style={{
                                animation: "card-scan 8s linear infinite",
                                animationDelay: `${index * 2}s`,
                              }}
                            />
                          </div>

                          <div className="relative z-10">
                            <h3 className="font-sans font-medium text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-wide">
                              {card.title}
                            </h3>
                            <p className="font-sans text-cyan-400/80 text-sm mb-4 tracking-wide font-light">
                              {card.subtitle}
                            </p>
                            <p className="font-sans text-gray-300/90 text-sm leading-relaxed font-light">
                              {card.description}
                            </p>
                          </div>

                          {selectedCard === card.id && (
                            <div
                              className="absolute top-6 right-6 w-5 h-5 bg-cyan-400/60 shadow-sm shadow-cyan-400/20"
                              style={{
                                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                                animation: "geo-pulse 4s ease-in-out infinite",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedCard && (
                    <div className="flex items-center justify-center space-x-6 mt-8">
                      <button
                        onClick={handleNavigate}
                        className="px-6 py-3 bg-black/80 border border-cyan-400/60 text-cyan-400/90 font-sans font-medium tracking-wide hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm shadow-cyan-400/10"
                        style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
                      >
                        ▶ INITIATE JUMP
                      </button>

                      <button
                        onClick={handleGoBack}
                        className="px-6 py-3 bg-black/80 border border-red-400/60 text-red-400/90 font-sans font-medium tracking-wide hover:bg-red-400/10 hover:border-red-400 transition-all duration-300 shadow-sm shadow-red-400/10"
                        style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
                      >
                        ◀ ABORT SEQUENCE
                      </button>
                    </div>
                  )}
                </div>
              </AdvancedScrollSection>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-amber-600 text-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <AdvancedScrollSection direction="fade" threshold={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-sans font-bold mb-4">
                  <ScrollTriggeredCounter end={500} suffix="+" />
                </div>
                <p className="font-sans text-base md:text-lg opacity-90">Community Members</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-sans font-bold mb-4">
                  <ScrollTriggeredCounter end={98.7} suffix="%" decimals={1} />
                </div>
                <p className="font-sans text-base md:text-lg opacity-90">Transformation Success Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-sans font-bold mb-4">
                  <ScrollTriggeredCounter end={100} suffix="%" />
                </div>
                <p className="font-sans text-base md:text-lg opacity-90">Money-Back Guarantee</p>
              </div>
            </div>
          </AdvancedScrollSection>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-900 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AdvancedScrollSection direction="fade" threshold={0.3}>
            <div className="text-center mb-20">
              <h2 className="font-sans font-bold text-5xl md:text-6xl mb-8 tracking-tight">
                Transformational Leadership
              </h2>
              <h3 className="font-sans font-semibold text-2xl text-amber-400 mb-6 tracking-wide">
                Not just content creation.
              </h3>
              <p className="font-sans text-xl text-gray-400 leading-relaxed text-lg">
                {
                  "As a public speaker, coach, and guide, I lead with real change—not just inspiration. Starseeds, lightworkers, and spiritual people alike: If you're ready to optimize your health, master your shadows, and become the best version of yourself—your journey starts here. You belong with us."
                }
              </p>
            </div>
          </AdvancedScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Spiritual Leadership",
                desc: "Guiding starseeds, lightworkers, and spiritual people through massive transformation, with practical wisdom and spiritual depth.",
                icon: "👑🛡️",
              },
              {
                title: "Health Optimization",
                desc: "Proper education and implementation in all areas of diet, nutrition, muscle building, circadian rhythm and other health optimizations and strategies, for peak physical, mental, and spiritual performance, to get the most out of life.",
                icon: "⚡💪",
              },
              {
                title: "Shadow Integration",
                desc: "Deep, integrative shadow work and inner transformation creates a permanent, long-term, lasting change—not fleeting motivation or a temporary adaptation.",
                icon: "🧩👤",
              },
            ].map((service, index) => (
              <AdvancedScrollSection key={index} direction="up" delay={index * 200} threshold={0.4}>
                <div className="group h-full" data-magnetic>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 lg:p-10 hover:border-amber-600 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                    <div className="text-4xl mb-6 flex-shrink-0">{service.icon}</div>
                    <h3 className="font-sans font-semibold text-2xl mb-6 text-white group-hover:text-amber-600 transition-colors flex-shrink-0">
                      {service.title}
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed text-lg flex-grow">{service.desc}</p>
                  </div>
                </div>
              </AdvancedScrollSection>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 bg-gray-800 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mb-10 shadow-lg"
            data-magnetic
          >
            <span className="text-white font-sans font-bold text-xl">Chris Star Enterprises </span>
          </div>
          <p className="font-sans text-gray-300 mb-6 text-lg">
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
