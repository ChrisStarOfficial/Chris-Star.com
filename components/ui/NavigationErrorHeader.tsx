interface ErrorHeaderProps {
  title?: string
  subtitle?: string
  description?: string
}

export default function ErrorHeader({ 
  title = "DESTINATION PATH INVALID", 
  subtitle = "NAVIGATION ERROR",
  description = "You have been redirected to the Lounge."
}: ErrorHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center mb-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
        <div
          className="mx-6 px-8 py-3 border border-electric/25 bg-gradient-to-r from-electric/8 to-electric/20 backdrop-blur-sm"
          style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
        >
          <span className="text-electric font-sans text-sm tracking-[0.2em] font-light">
            ◊ {subtitle} ◊
          </span>
        </div>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      </div>

      <h2 className="font-sans font-medium text-2xl md:text-3xl text-parchment mb-6 tracking-wide">
        {title}
      </h2>
      <p className="font-sans text-lg text-clay mb-24 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}