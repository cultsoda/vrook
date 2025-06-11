export interface Influencer {
  id: string
  name: string
  description: string
  profileImage: string
  coverImage: string
  bio: string
  followers: string
  category: string
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
  features: string[]
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
