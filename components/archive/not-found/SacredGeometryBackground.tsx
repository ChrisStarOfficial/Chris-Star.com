export default function SacredGeometryBackground() {
  return (
    <div className="absolute inset-0">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
              linear-gradient(0deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
              linear-gradient(45deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
          }}
        />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute top-20 left-20 w-40 h-40 border border-slate-300/6"
          style={{
            clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
            animation: "geo-rotate 200s linear infinite",
          }}
        />
        <div
          className="absolute top-20 right-20 w-32 h-32 border border-slate-300/8"
          style={{
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            animation: "geo-rotate 150s linear infinite reverse",
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-36 h-36 border border-slate-300/4"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            animation: "geo-pulse 180s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-28 h-28 border border-slate-300/7"
          style={{
            clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
            animation: "geo-rotate 120s linear infinite",
          }}
        />
      </div>

      {/* Scanning effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300/3 to-transparent"
          style={{
            animation: "geo-scan 120s linear infinite",
          }}
        />
        <div
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-300/2 to-transparent"
          style={{
            animation: "geo-scan-vertical 140s linear infinite",
            animationDelay: "30s",
          }}
        />
      </div>
    </div>
  )
}