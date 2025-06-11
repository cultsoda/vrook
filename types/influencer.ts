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
  galleryImages: string[]
  videoThumbnail: string
  vrPreview: string
  aiSamples: string[]
}

export interface Package {
  id: string
  name: string
  price: number
  originalPrice?: number
  features: string[] // 이제 번역 키를 저장
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