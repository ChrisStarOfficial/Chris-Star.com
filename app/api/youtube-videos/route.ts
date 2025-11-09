import { NextResponse } from 'next/server'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  publishedAt: string
  duration: string
}

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_HANDLE = 'ChrisStarOfficial' // Hardcoded since we know the username

  if (!API_KEY) {
    console.log('YouTube API key not configured, returning placeholder videos')
    return NextResponse.json({ videos: getPlaceholderVideos() })
  }

  try {
    // First, get channel ID from username
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${CHANNEL_HANDLE}&key=${API_KEY}`
    )
    
    if (!channelResponse.ok) {
      console.log('Channel API failed, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }
    
    const channelData = await channelResponse.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      console.log('Channel not found, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    const channelId = channelData.items[0].id

    console.log(`Found channel: ${channelId}, playlist: ${uploadsPlaylistId}`)

    // Get latest videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&key=${API_KEY}`
    )
    
    if (!playlistResponse.ok) {
      console.log('Playlist API failed, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }
    
    const playlistData = await playlistResponse.json()

    // If no videos found, return placeholders
    if (!playlistData.items || playlistData.items.length === 0) {
      console.log('No public videos found, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }

    // Extract video IDs for additional details
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',')

    // Get video details including duration
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${API_KEY}`
    )
    
    if (!videosResponse.ok) {
      console.log('Videos details API failed, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }
    
    const videosData = await videosResponse.json()

    // If no video details, return placeholders
    if (!videosData.items || videosData.items.length === 0) {
      console.log('No video details found, returning placeholder videos')
      return NextResponse.json({ videos: getPlaceholderVideos() })
    }

    // Format response with actual videos
    const videos: YouTubeVideo[] = videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
      url: `https://youtube.com/watch?v=${video.id}`,
      publishedAt: video.snippet.publishedAt,
      duration: formatDuration(video.contentDetails.duration)
    }))

    console.log(`Successfully fetched ${videos.length} videos from YouTube`)
    return NextResponse.json({ videos })
  } catch (error) {
    console.error('YouTube API error, returning placeholder videos:', error)
    return NextResponse.json({ videos: getPlaceholderVideos() })
  }
}

// Placeholder videos for when no public videos are available
function getPlaceholderVideos(): YouTubeVideo[] {
  return [
    {
      id: "placeholder-1",
      title: "Spiritual Awakening Journey",
      thumbnail: "/api/placeholder/400/225",
      url: "https://youtube.com/@ChrisStarOfficial",
      publishedAt: new Date().toISOString(),
      duration: "25:00"
    },
    {
      id: "placeholder-2", 
      title: "Shadow Work & Inner Transformation",
      thumbnail: "/api/placeholder/400/225",
      url: "https://youtube.com/@ChrisStarOfficial",
      publishedAt: new Date().toISOString(),
      duration: "32:15"
    },
    {
      id: "placeholder-3",
      title: "Health Optimization for Spiritual Growth",
      thumbnail: "/api/placeholder/400/225",
      url: "https://youtube.com/@ChrisStarOfficial",
      publishedAt: new Date().toISOString(),
      duration: "28:45"
    }
  ]
}

// Helper function to format ISO 8601 duration with null safety
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  
  if (!match) {
    return '0:00'
  }

  const hours = match[1] || ''
  const minutes = match[2] || '0'
  const seconds = match[3] || '0'
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  }
  return `${minutes}:${seconds.padStart(2, '0')}`
}