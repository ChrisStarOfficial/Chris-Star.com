import { useState, useEffect } from 'react'

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  publishedAt: string
  duration: string
}

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/youtube-videos')
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }
        
        const data = await response.json()
        
        // The API now always returns videos (either real or placeholders)
        setVideos(data.videos)
        
        // Only show error if we got placeholders but wanted to log it
        if (data.videos[0]?.id.startsWith('placeholder-')) {
          setError('Showing sample content - new videos coming soon!')
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err)
        // Even if fetch fails completely, we can show placeholders
        setVideos(getPlaceholderVideos())
        setError('Using sample content - check back soon for new videos!')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return { videos, loading, error }
}

// Backup placeholder function (in case API route also fails)
const getPlaceholderVideos = (): YouTubeVideo[] => [
  {
    id: "backup-1",
    title: "Spiritual Awakening Journey",
    thumbnail: "/api/placeholder/400/225",
    url: "https://youtube.com/@ChrisStarOfficial",
    publishedAt: new Date().toISOString(),
    duration: "25:00"
  },
  {
    id: "backup-2", 
    title: "Shadow Work & Inner Transformation",
    thumbnail: "/api/placeholder/400/225",
    url: "https://youtube.com/@ChrisStarOfficial",
    publishedAt: new Date().toISOString(),
    duration: "32:15"
  },
  {
    id: "backup-3",
    title: "Health Optimization for Spiritual Growth",
    thumbnail: "/api/placeholder/400/225",
    url: "https://youtube.com/@ChrisStarOfficial",
    publishedAt: new Date().toISOString(),
    duration: "28:45"
  }
]