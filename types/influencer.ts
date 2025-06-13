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