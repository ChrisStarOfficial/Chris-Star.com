"use client"

interface ActivateProtocolProps {
  onClick: () => void
}

export function ActivateProtocol({ onClick }: ActivateProtocolProps) {
  return (
    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 whitespace-nowrap cursor-pointer">
      <div 
        onClick={onClick}
        className="text-slate-300/90 font-sans text-xl font-bold tracking-widest bg-gray-900/80 px-6 py-3 rounded-xl backdrop-blur-sm border-2 border-slate-300/20 hover:bg-gray-800/80 hover:border-slate-300/30 transition-all duration-300"
      >
        ACTIVATE PROTOCOL
      </div>
    </div>
  )
}