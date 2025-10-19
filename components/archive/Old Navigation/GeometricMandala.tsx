interface GeometricMandalaProps {
  active: boolean
  onClick: () => void
}

export default function GeometricMandala({ active, onClick }: GeometricMandalaProps) {
  return (
    <div className="mb-16 flex items-center justify-center">
      <div className="relative">
        {/* Large central geometric pattern */}
        <div
          className={`relative cursor-pointer transition-all duration-1000 ${active ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          onClick={onClick}
        >
          <div className="relative w-80 h-80 group">
            <div
              className="absolute inset-0 border-2 border-slate-300/20 rounded-full group-hover:border-slate-300/35 transition-all duration-700"
              style={{
                animation: "geo-rotate 80s linear infinite",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 75% 25%, 75% 75%, 100% 75%, 100% 100%, 0% 100%)",
                boxShadow: "0 0 20px rgba(148, 163, 184, 0.05)",
              }}
            />
            <div
              className="absolute inset-4 border-2 border-slate-300/25 rounded-full group-hover:border-slate-300/40 transition-all duration-700"
              style={{
                animation: "geo-rotate 60s linear infinite reverse",
                clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 25% 75%)",
                boxShadow: "0 0 15px rgba(148, 163, 184, 0.08)",
              }}
            />
            <div
              className="absolute inset-8 border border-slate-300/15 rounded-full group-hover:border-slate-300/30 transition-all duration-700"
              style={{
                animation: "geo-rotate 100s linear infinite",
                clipPath: "polygon(0% 0%, 75% 0%, 75% 25%, 25% 25%, 25% 75%, 75% 75%, 75% 100%, 0% 100%)",
              }}
            />
            <div
              className="absolute inset-12 border border-slate-300/20 rounded-full group-hover:border-slate-300/35 transition-all duration-700"
              style={{
                animation: "geo-rotate 40s linear infinite reverse",
                clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)",
              }}
            />

            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-40 h-0.5 bg-slate-300/12 group-hover:bg-slate-300/20 origin-left transition-all duration-700"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                  boxShadow: "0 0 2px rgba(148, 163, 184, 0.1)",
                }}
              />
            ))}

            <div
              className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-slate-300/30 group-hover:border-slate-300/50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                animation: "geo-rotate 120s linear infinite",
                boxShadow: "0 0 10px rgba(148, 163, 184, 0.1)",
              }}
            />

            {/* Enhanced triangular elements */}
            <div
              className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-slate-300/35 group-hover:border-slate-300/55 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                animation: "geo-rotate 200s linear infinite reverse",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-slate-300/35 group-hover:border-slate-300/55 transform -translate-x-1/2 -translate-y-1/2 rotate-180 transition-all duration-700"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                animation: "geo-rotate 200s linear infinite",
              }}
            />

            {/* Enhanced orbital elements */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-slate-300/25 group-hover:bg-slate-300/45 rounded-full transition-all duration-700"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-140px)`,
                  animation: `geo-orbit ${150 + i * 25}s linear infinite`,
                  boxShadow: "0 0 8px rgba(148, 163, 184, 0.2)",
                }}
              />
            ))}

            {/* Enhanced central core */}
            <div
              className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-300/40 group-hover:bg-slate-300/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                animation: "geo-pulse 8s ease-in-out infinite",
                boxShadow: "0 0 12px rgba(148, 163, 184, 0.3)",
              }}
            />

            {/* Enhanced hover indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-slate-300/90 font-sans text-sm tracking-wider bg-gray-900/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-300/20">
                ◊ ACTIVATE PROTOCOLS ◊
              </div>
            </div>
          </div>
        </div>

        {/* Status indicators around the mandala */}
        <div
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${active ? "opacity-100 translate-y-0 delay-1500" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-cyan-400/80 shadow-sm shadow-cyan-400/20"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            <span className="text-cyan-300/90 text-xs font-sans tracking-wider font-light">
              ENTERTAINMENT PROTOCOLS AVAILABLE
            </span>
          </div>
        </div>

        <div
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${active ? "opacity-100 translate-y-0 delay-1700" : "opacity-0 -translate-y-4"}`}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-amber-400/80 shadow-sm shadow-amber-400/20"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                animation: "pulse 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />
            <span className="text-amber-300/90 text-xs font-sans tracking-wider font-light">CLICK TO ENGAGE</span>
          </div>
        </div>
      </div>
    </div>
  )
}