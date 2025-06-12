export interface Influencer {
  id: string
  name: string
  description: string
  descriptionEn?: string // 영문 설명 추가
  profileImage: string
  coverImage: string
  bio: string
  bioEn?: string // 영문 소개 추가
  category: string
  categoryKey?: string // 번역 키 추가
  socialLinks?: string[] // SNS 링크 배열 추가
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