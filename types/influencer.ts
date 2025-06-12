export interface SocialLinks {
  instagram?: string
  youtube?: string
  patreon?: string
  twitter?: string
  chzzk?: string
  likey?: string
  tiktok?: string
  threads?: string
  ctee?: string
  djawa?: string
  sooplive?: string
}

export interface Influencer {
  id: string
  name: string
  description: string // 해시태그로 변경됨
  descriptionEn?: string // 영문 해시태그 추가
  profileImage: string
  coverImage: string
  bio: string // 상세 설명으로 변경됨
  bioEn?: string // 영문 상세 설명 추가
  category: string
  categoryKey?: string // 번역 키 추가
  socialLinks?: SocialLinks // SNS 링크 추가
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