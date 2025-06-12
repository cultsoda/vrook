import type { Influencer, Package, IndividualProduct } from "@/types/influencer"

export const getInfluencerPackages = (influencerId: string): Package[] => {
  const basePrices = {
    gyeoudi: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    momorina: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    yanghyewon: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    kkyunyangnyang: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    jeongdabyeol: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    ina: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    cuina: { 
      basic: { krw: 59000, usd: 49 }, 
      special: { krw: 79000, usd: 69 }, 
      all: { krw: 99000, usd: 89 } 
    },
    trollya: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
    ssoblly: { 
      basic: { krw: 39000, usd: 29 }, 
      special: { krw: 59000, usd: 49 }, 
      all: { krw: 79000, usd: 69 } 
    },
  }

  const prices = basePrices[influencerId as keyof typeof basePrices] || basePrices.yanghyewon

  return [
    {
      id: "basic",
      name: "브이룩 패키지",
      price: prices.basic,
      features: ["photos20", "photoVideo1", "vrVideo1"],
      newFeatures: [], // 첫 번째 패키지는 새로운 기능 없음
    },
    {
      id: "special",
      name: "브이룩 스페셜 패키지",
      price: prices.special,
      features: ["photos20", "photoVideo1", "vrVideoFull1", "vrHmdGift"],
      newFeatures: ["vrVideoFull1", "vrHmdGift"], // 기본 패키지 대비 추가된 기능들
      highlight: true,
    },
    {
      id: "all",
      name: "브이룩 ALL 패키지",
      price: prices.all,
      features: ["photos20", "bcuts20", "photoVideo1", "vrVideoFull1", "vrHmdGift", "aiPhotos3", "photocardGift"],
      newFeatures: ["bcuts20", "aiPhotos3", "photocardGift"], // 스페셜 패키지 대비 추가된 기능들
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
    description: "패션 & 라이프스타일 인플루언서",
    descriptionEn: "Fashion & Lifestyle Influencer",
    profileImage: getInfluencerImagePath("gyeoudi"),
    coverImage: getInfluencerImagePath("gyeoudi"),
    bio: "패션과 라이프스타일을 통해 일상의 아름다움을 전달하는 크리에이터입니다. VR을 통해 더욱 생생한 경험을 선사합니다.",
    bioEn: "A creator who conveys the beauty of daily life through fashion and lifestyle. Delivers more vivid experiences through VR.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
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
    description: "뷰티 & 메이크업 아티스트",
    descriptionEn: "Beauty & Makeup Artist",
    profileImage: getInfluencerImagePath("momorina"),
    coverImage: getInfluencerImagePath("momorina"),
    bio: "뷰티와 메이크업의 새로운 트렌드를 제시하며, VR 기술로 더욱 실감나는 뷰티 콘텐츠를 만들어갑니다.",
    bioEn: "Presents new trends in beauty and makeup, creating more realistic beauty content with VR technology.",
    category: "Beauty & Makeup",
    categoryKey: "beautyMakeup",
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
    description: "푸드 & 쿠킹 인플루언서",
    descriptionEn: "Food & Cooking Influencer",
    profileImage: getInfluencerImagePath("ssoblly"),
    coverImage: getInfluencerImagePath("ssoblly"),
    bio: "맛있는 요리와 음식 문화를 소개하며, VR을 통해 요리 과정을 생생하게 체험할 수 있는 콘텐츠를 제작합니다.",
    bioEn: "Introduces delicious cooking and food culture, creating content that allows vivid experience of cooking process through VR.",
    category: "Food & Cooking",
    categoryKey: "foodCooking",
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
    description: "피트니스 & 웰니스 코치",
    descriptionEn: "Fitness & Wellness Coach",
    profileImage: getInfluencerImagePath("yanghyewon"),
    coverImage: getInfluencerImagePath("yanghyewon"),
    bio: "건강한 라이프스타일과 피트니스를 통해 긍정적인 에너지를 전달합니다. VR로 함께 운동하는 새로운 경험을 제공합니다.",
    bioEn: "Delivers positive energy through healthy lifestyle and fitness. Provides new experience of exercising together through VR.",
    category: "Fitness & Wellness",
    categoryKey: "fitnessWellness",
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
    description: "여행 & 어드벤처 크리에이터",
    descriptionEn: "Travel & Adventure Creator",
    profileImage: getInfluencerImagePath("kkyunyangnyang"),
    coverImage: getInfluencerImagePath("kkyunyangnyang"),
    bio: "전 세계 아름다운 여행지를 소개하며, VR을 통해 집에서도 생생한 여행 경험을 할 수 있도록 합니다.",
    bioEn: "Introduces beautiful travel destinations around the world, enabling vivid travel experiences at home through VR.",
    category: "Travel & Adventure",
    categoryKey: "travelAdventure",
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
    name: "정다별",
    description: "교육 & 라이프스타일 크리에이터",
    descriptionEn: "Education & Lifestyle Creator",
    profileImage: getInfluencerImagePath("jeongdabyeol"),
    coverImage: getInfluencerImagePath("jeongdabyeol"),
    bio: "교육적이고 유익한 콘텐츠를 통해 지식과 정보를 전달하며, VR 교육 콘텐츠로 새로운 학습 경험을 제공합니다.",
    bioEn: "Delivers knowledge and information through educational and beneficial content, providing new learning experiences with VR educational content.",
    category: "Education & Lifestyle",
    categoryKey: "educationLifestyle",
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
    description: "게임 & 엔터테인먼트 크리에이터",
    descriptionEn: "Gaming & Entertainment Creator",
    profileImage: getInfluencerImagePath("ina"),
    coverImage: getInfluencerImagePath("ina"),
    bio: "게임과 엔터테인먼트 콘텐츠를 통해 재미와 즐거움을 전달하며, VR 게임 체험으로 새로운 재미를 선사합니다.",
    bioEn: "Delivers fun and enjoyment through game and entertainment content, providing new fun with VR game experiences.",
    category: "Gaming & Entertainment",
    categoryKey: "gamingEntertainment",
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
    description: "패션 & 라이프스타일 인플루언서",
    descriptionEn: "Fashion & Lifestyle Influencer",
    profileImage: getInfluencerImagePath("cuina"),
    coverImage: getInfluencerImagePath("cuina"),
    bio: "패션과 라이프스타일을 통해 일상의 아름다움을 전달하는 크리에이터입니다. VR을 통해 더욱 생생한 경험을 선사합니다.",
    bioEn: "A creator who conveys the beauty of daily life through fashion and lifestyle. Delivers more vivid experiences through VR.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
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
    description: "음악 & 댄스 크리에이터",
    descriptionEn: "Music & Dance Creator",
    profileImage: getInfluencerImagePath("trollya"),
    coverImage: getInfluencerImagePath("trollya"),
    bio: "음악과 댄스를 통해 즐거움을 전달하는 크리에이터입니다. VR 콘서트와 댄스 레슨으로 새로운 엔터테인먼트를 선보입니다.",
    bioEn: "A creator who delivers joy through music and dance. Presents new entertainment with VR concerts and dance lessons.",
    category: "Music & Dance",
    categoryKey: "musicDance",
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