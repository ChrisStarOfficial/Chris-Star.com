import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chris-star.com'
  const currentDate = new Date()
  
  const allPages = [
    '/',
    '/navigation',
    '/community',
    '/feedback',
    '/music',
    '/archives',
    '/archives/vault',
    '/archives/wiki',
    '/archives/compendia',
    '/sitemap',
    '/terms',
    '/privacy',
    '/legal',
    '/careers',
  ]
  
  return allPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === '/' ? 'monthly' as const : 'weekly' as const,
    priority: page === '/' ? 1 : 0.8,
  }))
}