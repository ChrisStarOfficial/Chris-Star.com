"use client"

import { ScrollSection } from "@/components/layout/scroll-section"
import { YouTubeVideo } from "@/components/shared/hooks/useYouTubeVideos"

interface LatestVideosSectionProps {
  mousePosition: { x: number; y: number }
  videos: YouTubeVideo[]
  loading: boolean
  error: string | null
}

export function LatestVideosSection({ mousePosition, videos, loading, error }: LatestVideosSectionProps) {
  return (
    <section className="h-screen flex items-center justify-center px-6 bg-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <ScrollSection direction="fade">
          <div className="text-center mb-8">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight">
              Latest Free Content
            </h2>
            <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Fresh spiritual guidance and practices to support your journey
            </p>
          </div>
        </ScrollSection>

        {loading ? (
          <VideoSkeleton />
        ) : (
          <>
            {error && (
              <div className="text-center mb-8">
                <div className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 px-6 py-3 rounded-lg">
                  {error}
                </div>
              </div>
            )}
            
            {videos.length > 0 && (
              <ScrollSection direction="up" delay={200}>
                <div className="grid md:grid-cols-3 gap-8">
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </ScrollSection>
            )}
            
            {videos.length === 0 && !loading && (
              <div className="text-center text-amber-400">
                <p>Content coming soon! Check back later for new videos.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function VideoSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg animate-pulse">
          <div className="aspect-video bg-gray-700"></div>
          <div className="p-2 text-center">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  const getGradientClass = (title: string) => {
    if (title.includes('Shadow')) return 'bg-gradient-to-br from-gray-900 to-amber-900'
    if (title.includes('Starseed')) return 'bg-gradient-to-br from-blue-900 to-purple-900'
    if (title.includes('Health')) return 'bg-gradient-to-br from-green-900 to-amber-900'
    return 'bg-gradient-to-br from-amber-900 to-rose-900'
  }

  return (
    <div 
      className="group bg-transparent border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-amber-600 transition-all duration-500 cursor-pointer transform hover:scale-105"
      onClick={() => window.open(video.url, '_blank')}
      data-magnetic
    >
      <div className="relative aspect-video bg-gray-700 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-amber-900/40 to-purple-900/40 flex items-center justify-center relative">
          {video.thumbnail && !video.thumbnail.includes('placeholder') ? (
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <div className={`absolute inset-0 opacity-60 ${getGradientClass(video.title)}`} />
          )}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* YouTube play button */}
          <div className="relative z-10 text-center text-white/90">
            <svg className="w-16 h-14 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 68 48">
              <path fill="#f71c47" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"/>
              <path fill="white" d="M45,24L27,14v20L45,24z"/>
            </svg>
          </div>

          {/* Duration timestamp */}
          <div className="absolute bottom-2 right-2 z-10">
            <span className="text-sm font-sans text-white px-1 py-0.5 rounded" style={{ backgroundColor: '#202124' }}>
              {video.duration}
            </span>
          </div>
        </div>
      </div>
      
      {/* Glassmorphism title area */}
      <div className="bg-black/40 backdrop-blur-md border-t border-white/10 p-2 text-center rounded-b-2xl">
        <h3 className="font-sans font-semibold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2">
          {video.title}
        </h3>
      </div>
    </div>
  )
}