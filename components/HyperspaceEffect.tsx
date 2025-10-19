export const HyperspaceEffect = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-900/40 to-black">
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `hyperspace-tunnel ${2 + Math.random() * 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-light tracking-widest animate-pulse">
            JUMPING TO DESTINATION
          </div>
        </div>
      </div>
    </div>
  )
}