import { NextResponse } from 'next/server'

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

  // Check if environment variables are set
  if (!API_KEY) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY is missing from .env.local' })
  }
  
  if (!CHANNEL_ID) {
    return NextResponse.json({ error: 'YOUTUBE_CHANNEL_ID is missing from .env.local' })
  }

  // Test the exact API call that's failing
  const testUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
  
  try {
    const response = await fetch(testUrl)
    const data = await response.json()
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      url: testUrl.replace(API_KEY, 'HIDDEN'), // Hide API key in response
      response: data,
      channelId: CHANNEL_ID,
      apiKeyPresent: !!API_KEY
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Fetch failed completely',
      message: error instanceof Error ? error.message : 'Unknown error',
      url: testUrl.replace(API_KEY, 'HIDDEN')
    })
  }
}