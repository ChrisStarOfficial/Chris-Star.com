import Link from "next/link"

interface NavigationButtonsProps {
  primaryHref?: string
  primaryText?: string
  secondaryHref?: string
  secondaryText?: string
}

export default function NavigationButtons({
  primaryHref = "/",
  primaryText = "RETURN TO BASE",
  secondaryHref = "/community", 
  secondaryText = "JOIN ALLIANCE"
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
      <Link
        href={primaryHref}
        className="bg-amber-600/90 text-white px-10 py-4 rounded-xl font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-amber-500/30"
        style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
      >
        ▶ {primaryText}
      </Link>
      <Link
        href={secondaryHref}
        className="border-2 border-amber-400/60 text-amber-400 px-10 py-4 rounded-xl font-sans font-bold text-lg hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300 backdrop-blur-sm"
        style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
      >
        ◊ {secondaryText}
      </Link>
    </div>
  )
}