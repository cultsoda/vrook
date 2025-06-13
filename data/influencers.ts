import type { Influencer, Package, IndividualProduct } from "@/types/influencer"

export const getInfluencerPackages = (influencerId: string): Package[] => {
  const basePrices = {
    gyeoudi: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 } 
    },
    momorina: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 } 
    },
    yanghyewon: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 }  
    },
    kkyunyangnyang: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 } 
    },
    jeongdabyeol: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 } 
    },
    ina: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 }  
    },
    cuina: { 
      basic: { krw: 59000, usd: 49.5 }, 
      special: { krw: 79000, usd: 69.3 }, 
      all: { krw: 99000, usd: 89.1 } 
    },
    trollya: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 } 
    },
    ssoblly: { 
      basic: { krw: 39000, usd: 29.7 }, 
      special: { krw: 59000, usd: 49.5 }, 
      all: { krw: 79000, usd: 69.3 }  
    },
  }

  const prices = basePrices[influencerId as keyof typeof basePrices] || basePrices.yanghyewon

  return [
    {
      id: "basic",
      name: "브이룩 패키지",
      price: prices.basic,
      features: ["photos20", "photoVideo1", "vrVideo1"],
      newFeatures: [],
    },
    {
      id: "special",
      name: "브이룩 스페셜 패키지",
      price: prices.special,
      features: ["photos20", "photoVideo1", "vrVideoFull1", "vrHmdGift"],
      newFeatures: ["vrVideoFull1", "vrHmdGift"],
      highlight: true,
    },
    {
      id: "all",
      name: "브이룩 ALL 패키지",
      price: prices.all,
      features: ["photos20", "bcuts20", "photoVideo1", "vrVideoFull1", "vrHmdGift", "aiPhotos3", "photocardGift"],
      newFeatures: ["bcuts20", "aiPhotos3", "photocardGift"],
    },
  ]
}

export const packages: Package[] = [
  {
    id: "basic",
    name: "브이룩 패키지",
    price: { krw: 39000, usd: 29 },
    features: ["photos20", "photoVideo1", "vrVideo1"],
    newFeatures: [],
  },
  {
    id: "special",
    name: "브이룩 스페셜 패키지",
    price: { krw: 59000, usd: 49 },
    features: ["photos20", "photoVideo1", "vrVideoFull1", "vrHmdGift"],
    newFeatures: ["vrVideoFull1", "vrHmdGift"],
    highlight: true,
  },
  {
    id: "all",
    name: "브이룩 ALL 패키지",
    price: { krw: 79000, usd: 69 },
    features: ["photos20", "bcuts20", "photoVideo1", "vrVideoFull1", "vrHmdGift", "aiPhotos3", "photocardGift"],
    newFeatures: ["bcuts20", "aiPhotos3", "photocardGift"],
  },
]

export const individualProducts: IndividualProduct[] = [
  {
    id: "photo-pack",
    name: "화보 사진 20장",
    description: "고품질 프로페셔널 화보 사진 컬렉션. 다양한 컨셉과 의상으로 촬영된 독점 사진들을 만나보세요.",
    price: 25000,
    previewImage: "/placeholder.svg?height=300&width=400",
    category: "photo",
    quantity: 20,
  },
  {
    id: "vr-video",
    name: "VR 영상 1개",
    description: "몰입감 있는 VR 기술로 제작된 독점 영상. VR 헤드셋으로 생생한 경험을 즐겨보세요.",
    price: 35000,
    previewImage: "/placeholder.svg?height=300&width=400",
    category: "vr",
    quantity: 1,
  },
  {
    id: "photo-video",
    name: "화보 영상 1개",
    description: "프리미엄 화보 촬영 과정과 비하인드 스토리가 담긴 고화질 영상 콘텐츠입니다.",
    price: 20000,
    previewImage: "/placeholder.svg?height=300&width=400",
    category: "video",
    quantity: 1,
  },
  {
    id: "ai-photos",
    name: "AI 합성 사진 3장",
    description: "최신 AI 기술로 생성된 창의적이고 독특한 합성 화보. 현실과 상상이 만나는 특별한 작품들입니다.",
    price: 15000,
    previewImage: "/placeholder.svg?height=300&width=400",
    category: "ai",
    quantity: 3,
  },
]

// 동적 이미지 경로 생성 함수
const getInfluencerImagePath = (id: string, type: 'profile' | 'cover' = 'profile') => {
  return `/images/${id}.webp`
}

// 상품별 썸네일 이미지 경로 생성 함수
const getProductThumbnail = (influencerId: string, productType: string) => {
  return `/images/products/${influencerId}_${productType}.webp`
}

export const influencers: Influencer[] = [
  {
    id: "gyeoudi",
    name: "겨우디",
    descriptionKey: "influencers.gyeoudi.description",
    bioKey: "influencers.gyeoudi.bio",
    profileImage: getInfluencerImagePath("gyeoudi"),
    coverImage: getInfluencerImagePath("gyeoudi"),
    socialLinks: [
      "https://www.instagram.com/winter_28270?igsh=OXUyejk3MG05Zmx3&utm_source=qr",
      // "https://www.patreon.com/c/winterD/membership?showCustomPledge=true",
      "https://www.youtube.com/@winterD",
      // "https://cafe.naver.com/winterd?tc=shared_link",
      "https://ch.sooplive.co.kr/rlrlvkvk123",
      "https://www.twitch.tv/kyul365",
      "https://www.tiktok.com/@winter_28270?_t=8pqojdxG0tb&_r=1"
    ],
    galleryImages: [
      getProductThumbnail("gyeoudi", "photos"),
      getProductThumbnail("gyeoudi", "bcuts"), 
      getProductThumbnail("gyeoudi", "video"),
      getProductThumbnail("gyeoudi", "vr"),
    ],
    videoThumbnail: getProductThumbnail("gyeoudi", "video"),
    vrPreview: getProductThumbnail("gyeoudi", "vr"),
    aiSamples: [
      getProductThumbnail("gyeoudi", "ai"),
      getProductThumbnail("gyeoudi", "ai"),
      getProductThumbnail("gyeoudi", "ai"),
    ],
  },
  {
    id: "momorina",
    name: "모모리나",
    descriptionKey: "influencers.momorina.description",
    bioKey: "influencers.momorina.bio",
    profileImage: getInfluencerImagePath("momorina"),
    coverImage: getInfluencerImagePath("momorina"),
    socialLinks: [
      "https://www.youtube.com/@momo_rina",
      "https://x.com/_momo_rina_",
      // "https://www.patreon.com/momorina"
    ],
    galleryImages: [
      getProductThumbnail("momorina", "photos"),
      getProductThumbnail("momorina", "bcuts"),
      getProductThumbnail("momorina", "video"),
      getProductThumbnail("momorina", "vr"),
    ],
    videoThumbnail: getProductThumbnail("momorina", "video"),
    vrPreview: getProductThumbnail("momorina", "vr"),
    aiSamples: [
      getProductThumbnail("momorina", "ai"),
      getProductThumbnail("momorina", "ai"),
      getProductThumbnail("momorina", "ai"),
    ],
  },
  {
    id: "ssoblly",
    name: "쏘블리",
    descriptionKey: "influencers.ssoblly.description",
    bioKey: "influencers.ssoblly.bio",
    profileImage: getInfluencerImagePath("ssoblly"),
    coverImage: getInfluencerImagePath("ssoblly"),
    socialLinks: [
      "https://www.instagram.com/leeesovelys2/",
      "https://www.youtube.com/channel/UCO2GVjlhscG3hxfOZYUYLxg",
     //  "https://www.patreon.com/leeesovely",
      "https://x.com/leeesovely"
    ],
    galleryImages: [
      getProductThumbnail("ssoblly", "photos"),
      getProductThumbnail("ssoblly", "bcuts"),
      getProductThumbnail("ssoblly", "video"),
      getProductThumbnail("ssoblly", "vr"),
    ],
    videoThumbnail: getProductThumbnail("ssoblly", "video"),
    vrPreview: getProductThumbnail("ssoblly", "vr"),
    aiSamples: [
      getProductThumbnail("ssoblly", "ai"),
      getProductThumbnail("ssoblly", "ai"),
      getProductThumbnail("ssoblly", "ai"),
    ],
  },
  {
    id: "yanghyewon",
    name: "양혜원",
    descriptionKey: "influencers.yanghyewon.description",
    bioKey: "influencers.yanghyewon.bio",
    profileImage: getInfluencerImagePath("yanghyewon"),
    coverImage: getInfluencerImagePath("yanghyewon"),
    socialLinks: [
      "https://www.instagram.com/h.xon_y/",
      // "https://www.threads.com/@h.xon_y?xmt=AQF0A8GMNAFZls4J8v0hNwYl65FgX_h-nDSS_5yA8Zu6QMg"
    ],
    galleryImages: [
      getProductThumbnail("yanghyewon", "photos"),
      getProductThumbnail("yanghyewon", "bcuts"),
      getProductThumbnail("yanghyewon", "video"),
      getProductThumbnail("yanghyewon", "vr"),
    ],
    videoThumbnail: getProductThumbnail("yanghyewon", "video"),
    vrPreview: getProductThumbnail("yanghyewon", "vr"),
    aiSamples: [
      getProductThumbnail("yanghyewon", "ai"),
      getProductThumbnail("yanghyewon", "ai"),
      getProductThumbnail("yanghyewon", "ai"),
    ],
  },
  {
    id: "kkyunyangnyang",
    name: "뀨냥냥",
    descriptionKey: "influencers.kkyunyangnyang.description",
    bioKey: "influencers.kkyunyangnyang.bio",
    profileImage: getInfluencerImagePath("kkyunyangnyang"),
    coverImage: getInfluencerImagePath("kkyunyangnyang"),
    socialLinks: [
      "https://www.instagram.com/qnne0202/",
      "https://chzzk.naver.com/3eca060fbf7c633b5785f96b25ea275b"
    ],
    galleryImages: [
      getProductThumbnail("kkyunyangnyang", "photos"),
      getProductThumbnail("kkyunyangnyang", "bcuts"),
      getProductThumbnail("kkyunyangnyang", "video"),
      getProductThumbnail("kkyunyangnyang", "vr"),
    ],
    videoThumbnail: getProductThumbnail("kkyunyangnyang", "video"),
    vrPreview: getProductThumbnail("kkyunyangnyang", "vr"),
    aiSamples: [
      getProductThumbnail("kkyunyangnyang", "ai"),
      getProductThumbnail("kkyunyangnyang", "ai"),
      getProductThumbnail("kkyunyangnyang", "ai"),
    ],
  },
  {
    id: "jeongdabyeol",
    name: "정다별이",
    descriptionKey: "influencers.jeongdabyeol.description",
    bioKey: "influencers.jeongdabyeol.bio",
    profileImage: getInfluencerImagePath("jeongdabyeol"),
    coverImage: getInfluencerImagePath("jeongdabyeol"),
    socialLinks: [
      "https://www.instagram.com/jdabyeol2",
      "https://www.youtube.com/@dainxodo",
      "https://www.tiktok.com/@.dabyeol2"
      
    ],
    galleryImages: [
      getProductThumbnail("jeongdabyeol", "photos"),
      getProductThumbnail("jeongdabyeol", "bcuts"),
      getProductThumbnail("jeongdabyeol", "video"),
      getProductThumbnail("jeongdabyeol", "vr"),
    ],
    videoThumbnail: getProductThumbnail("jeongdabyeol", "video"),
    vrPreview: getProductThumbnail("jeongdabyeol", "vr"),
    aiSamples: [
      getProductThumbnail("jeongdabyeol", "ai"),
      getProductThumbnail("jeongdabyeol", "ai"),
      getProductThumbnail("jeongdabyeol", "ai"),
    ],
  },
  {
    id: "ina",
    name: "이나",
    descriptionKey: "influencers.ina.description",
    bioKey: "influencers.ina.bio",
    profileImage: getInfluencerImagePath("ina"),
    coverImage: getInfluencerImagePath("ina"),
    socialLinks: [
      "https://www.instagram.com/inah_sekiz05/"
    ],
    galleryImages: [
      getProductThumbnail("ina", "photos"),
      getProductThumbnail("ina", "bcuts"),
      getProductThumbnail("ina", "video"),
      getProductThumbnail("ina", "vr"),
    ],
    videoThumbnail: getProductThumbnail("ina", "video"),
    vrPreview: getProductThumbnail("ina", "vr"),
    aiSamples: [
      getProductThumbnail("ina", "ai"),
      getProductThumbnail("ina", "ai"),
      getProductThumbnail("ina", "ai"),
    ],
  },
  {
    id: "cuina",
    name: "큐이나",
    descriptionKey: "influencers.cuina.description",
    bioKey: "influencers.cuina.bio",
    profileImage: getInfluencerImagePath("cuina"),
    coverImage: getInfluencerImagePath("cuina"),
    socialLinks: [
      "https://www.instagram.com/lovxena",
      "https://www.youtube.com/@xloveex",
      "https://ch.sooplive.co.kr/rixzee"
    ],
    galleryImages: [
      getProductThumbnail("cuina", "photos"),
      getProductThumbnail("cuina", "bcuts"),
      getProductThumbnail("cuina", "video"),
      getProductThumbnail("cuina", "vr"),
    ],
    videoThumbnail: getProductThumbnail("cuina", "video"),
    vrPreview: getProductThumbnail("cuina", "vr"),
    aiSamples: [
      getProductThumbnail("cuina", "ai"),
      getProductThumbnail("cuina", "ai"),
      getProductThumbnail("cuina", "ai"),
    ],
  },
  {
    id: "trollya",
    name: "트롤야",
    descriptionKey: "influencers.trollya.description",
    bioKey: "influencers.trollya.bio",
    profileImage: getInfluencerImagePath("trollya"),
    coverImage: getInfluencerImagePath("trollya"),
    socialLinks: [
      "https://www.youtube.com/channel/UC2KFBTZ9d-mOa0zCytAZRMw",
      "https://chzzk.naver.com/826f57d3283418e1fa39dfb23dc1dea8"
    ],
    galleryImages: [
      getProductThumbnail("trollya", "photos"),
      getProductThumbnail("trollya", "bcuts"),
      getProductThumbnail("trollya", "video"),
      getProductThumbnail("trollya", "vr"),
    ],
    videoThumbnail: getProductThumbnail("trollya", "video"),
    vrPreview: getProductThumbnail("trollya", "vr"),
    aiSamples: [
      getProductThumbnail("trollya", "ai"),
      getProductThumbnail("trollya", "ai"),
      getProductThumbnail("trollya", "ai"),
    ],
  },
]