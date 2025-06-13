import type { Metadata } from 'next'
import { Influencer } from '@/types/influencer'

// 실제 사용할 사이트 정보
export const SITE_CONFIG = {
  name: 'VROOK',
  description: 'VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달하는 혁신적인 셀럽 화보 플랫폼',
  url: 'https://vrook.vercel.app',
  ogImage: '/og-default.jpg',
  keywords: 'VR, 화보, 셀럽, AI, 인플루언서, 가상현실, VROOK, XROMEDA',
  author: 'VROOK',
}

// 인플루언서별 동적 메타데이터 생성
export function generateInfluencerMetadata(influencer: Influencer): Metadata {
  const title = `${influencer.name} - VROOK VR 셀럽 화보`
  const description = `${influencer.name}의 독점 VR 화보와 AI 사진을 만나보세요. 프리미엄 콘텐츠로 새로운 몰입 경험을 제공합니다.`
  const url = `${SITE_CONFIG.url}/influencer/${influencer.id}`
  const ogImageUrl = `${SITE_CONFIG.url}/og-${influencer.id}.jpg`

  return {
    title,
    description,
    keywords: `${influencer.name}, ${SITE_CONFIG.keywords}`,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    
    // Open Graph
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      url,
      siteName: SITE_CONFIG.name,
      images: [
          {
            url: `${SITE_CONFIG.url}${ogImageUrl}`,
            width: 1200,
            height: 630,
            alt: `${influencer.name} - VROOK VR 셀럽 화보`,
            type: 'image/jpeg',
        },
        {
          url: influencer.profileImage,
          width: 800,
          height: 800,
          alt: `${influencer.name} 프로필`,
          type: 'image/webp',
        }
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}${ogImageUrl}`],
    },
    
    // 추가 메타 태그들
    other: {
      'theme-color': '#7c3aed',
      'og:image:alt': `${influencer.name} - VROOK VR 셀럽 화보`,
      'twitter:image:alt': `${influencer.name} - VROOK VR 셀럽 화보`,
    },
    
    // 정규 URL
    alternates: {
      canonical: url,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// 홈페이지 메타데이터
export function generateHomeMetadata(): Metadata {
  return {
    title: `${SITE_CONFIG.name} - VR 셀럽 화보 플랫폼`,
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    
    openGraph: {
      title: `${SITE_CONFIG.name} - VR 셀럽 화보 플랫폼`,
      description: SITE_CONFIG.description,
      type: 'website',
      locale: 'ko_KR',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - VR 셀럽 화보 플랫폼`,
          type: 'image/jpeg',
        }
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_CONFIG.name} - VR 셀럽 화보 플랫폼`,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.ogImage],
    },
    
    robots: {
      index: true,
      follow: true,
    },
  }
}

// 구조화된 데이터 생성 (JSON-LD)
export function generateStructuredData(influencer: Influencer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": influencer.name,
    "description": `${influencer.name} - VROOK VR 셀럽 화보 플랫폼`,
    "image": influencer.profileImage,
    "url": `${SITE_CONFIG.url}/influencer/${influencer.id}`,
    "sameAs": influencer.socialLinks || [],
    "jobTitle": "Influencer",
    "worksFor": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "description": SITE_CONFIG.description
    }
  }
}