interface ErrorHeaderProps {
  title?: string
  subtitle?: string
  description?: string
}

export default function ErrorHeader({ 
  title = "DESTINATION PATH INVALID", 
  subtitle = "NAVIGATION ERROR",
  description = "You have been redirected to The Lounge."
}: ErrorHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center justify-center text-center"> {/* Added flex centering */}
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
      <p className="font-sans text-lg text-slate-300/80 mb-24 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}