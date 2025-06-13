import { MetadataRoute } from 'next'
import { influencers } from '@/data/influencers'
import { SITE_CONFIG } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url
  const now = new Date()

  // 기본 페이지들
  const routes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // 인플루언서별 페이지들
  const influencerRoutes = influencers.map((influencer) => ({
    url: `${baseUrl}/influencer/${influencer.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...influencerRoutes]
}