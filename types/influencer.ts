export interface Influencer {
  id: string
  name: string
  descriptionKey: string // description -> descriptionKey로 변경
  bioKey: string // bio -> bioKey로 변경
  profileImage: string
  coverImage: string
  socialLinks?: string[]
  galleryImages: string[]
  videoThumbnail: string
  vrPreview: string
  aiSamples: string[]
}

export interface Package {
  id: string
  name: string
  price: {
    krw: number
    usd: number
  }
  originalPrice?: {
    krw: number
    usd: number
  }
  features: string[] // 번역 키를 저장
  newFeatures?: string[] // 이전 패키지 대비 새로 추가된 기능들
  highlight?: boolean
}

export interface IndividualProduct {
  id: string
  name: string
  description: string
  price: number
  previewImage: string
  category: "photo" | "vr" | "video" | "ai"
  quantity?: number
}

// 오픈그래프 메타데이터를 위한 타입 추가
export interface SEOMetadata {
  title: string
  description: string
  keywords: string
  ogImage: string
  twitterImage: string
  canonicalUrl: string
}

// 소셜 미디어 플랫폼 타입
export type SocialPlatform = 
  | 'instagram' 
  | 'youtube' 
  | 'tiktok' 
  | 'twitch' 
  | 'twitter' 
  | 'patreon' 
  | 'chzzk' 
  | 'sooplive' 
  | 'threads' 
  | 'naver_cafe' 
  | 'generic'

export interface SocialPlatformInfo {
  name: string
  icon: React.ReactNode
  platform: SocialPlatform
}