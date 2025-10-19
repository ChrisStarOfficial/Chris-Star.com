// /components/NavigationControls.tsx
interface NavigationControlsProps {
  selectedDestination: string | null
  destinations: any[]
  onDestinationSelect: (id: string) => void
  onClearSelection: () => void
}

export const NavigationControls = ({
  selectedDestination,
  destinations,
  onDestinationSelect,
  onClearSelection
}: NavigationControlsProps) => {
  return (
    <>
      {/* Top Left Status */}
      <div className="absolute top-8 left-8 text-white">
        <div className="text-sm font-light tracking-widest opacity-80">
          NAVIGATION SEGMENT ACTIVE
        </div>
        <div className="text-xs font-light tracking-wider opacity-60 mt-1">
          {selectedDestination ? 'DESTINATION LOCKED' : 'JUMP DRIVE READY'}
        </div>
      </div>

      {/* Bottom Center Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <div className="text-sm font-light tracking-widest opacity-80 mb-2">
          {selectedDestination ? 'CONFIRM JUMP' : 'SELECT DESTINATION'}
        </div>
        <div className="text-xs font-light tracking-wider opacity-60">
          {selectedDestination 
            ? 'Engage hyperdrive or cancel navigation' 
            : 'Scroll to rotate view • Hover Earth to activate satellites'
          }
        </div>
      </div>

      {/* Quick Selection Panel */}
      <div className="absolute top-8 right-8 flex flex-col space-y-2">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            className={`px-3 py-2 text-xs font-light tracking-wider rounded border transition-all duration-300 ${
              selectedDestination === destination.id
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-black/20 border-white/20 text-white/60 hover:text-white'
            }`}
            onClick={() => onDestinationSelect(destination.id)}
          >
            {destination.title}
          </button>
        ))}
      </div>
    </>
  )
}