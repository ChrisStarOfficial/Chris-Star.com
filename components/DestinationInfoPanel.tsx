interface Destination {
  id: string
  title: string
  subtitle: string
  description: string
}

interface DestinationInfoPanelProps {
  destination: Destination | undefined
  onSelect: () => void
  onClose: () => void
}

export const DestinationInfoPanel = ({ destination, onSelect, onClose }: DestinationInfoPanelProps) => {
  if (!destination) return null

  return (
    <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white max-w-sm">
      <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-light tracking-wide mb-2">
          {destination.title}
        </h3>
        <p className="text-sm font-light tracking-wider opacity-80 mb-4">
          {destination.subtitle}
        </p>
        <p className="text-xs font-light leading-relaxed opacity-70 mb-6">
          {destination.description}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onSelect}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/40 rounded transition-all duration-300"
          />
          <button
            onClick={onClose}
            className="w-12 h-12 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}