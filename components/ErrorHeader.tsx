interface ErrorHeaderProps {
  title?: string
  subtitle?: string
  description?: string
}

export default function ErrorHeader({ 
  title = "DESTINATION NOT FOUND", 
  subtitle = "NAVIGATION ERROR",
  description = "The coordinates you've entered do not correspond to any known location in our star chart. While our navigation systems recalibrate, perhaps you'd like to engage the entertainment protocols?"
}: ErrorHeaderProps) {
  return (
    <div className="mb-16">
      <div className="relative mb-8">
        <h1
          className="font-sans font-light text-8xl md:text-9xl text-white tracking-[0.2em] relative z-20"
          style={{
            textShadow: "0 0 40px rgba(148, 163, 184, 0.1), 0 0 80px rgba(148, 163, 184, 0.05)",
            filter: "drop-shadow(0 0 12px rgba(148, 163, 184, 0.08))",
          }}
        >
          4⟨0⟩4
        </h1>

        {/* Geometric frame around 404 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-32">
            <div
              className="absolute inset-0 border border-slate-300/8 rounded-lg"
              style={{
                clipPath:
                  "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)",
              }}
            />
            <div
              className="absolute -top-1 -left-1 w-8 h-8 border-t border-l border-slate-300/12"
              style={{ clipPath: "polygon(0 0, 100% 0, 75% 25%, 25% 25%, 25% 75%, 0 100%)" }}
            />
            <div
              className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-slate-300/12"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 75%, 25% 75%, 25% 25%)" }}
            />
            <div
              className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-slate-300/12"
              style={{ clipPath: "polygon(0 0, 25% 25%, 25% 75%, 75% 75%, 100% 100%, 0 100%)" }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 border-b border-r border-slate-300/12"
              style={{ clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 100% 100%, 100% 0, 0 0)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />
        <div
          className="mx-6 px-8 py-3 border border-red-400/25 bg-gradient-to-r from-red-400/8 to-red-500/8 backdrop-blur-sm"
          style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
        >
          <span className="text-red-300/95 font-sans text-sm tracking-[0.2em] font-light">
            ◊ {subtitle} ◊
          </span>
        </div>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />
      </div>

      <h2 className="font-sans font-medium text-2xl md:text-3xl text-slate-200 mb-6 tracking-wide">
        {title}
      </h2>
      <p className="font-sans text-lg text-slate-300/80 mb-12 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}