interface LoadingScreenProps {
  loadingProgress: number
}

export const LoadingScreen = ({ loadingProgress }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rotate-12 animate-spin-reverse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rotate-45 animate-pulse" />
        </div>
        
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-white text-lg font-light tracking-widest mb-8">
            RENDERING LOCATION
          </div>
          <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}