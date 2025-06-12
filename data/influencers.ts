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
    description: "#화보장인 #어나더레벨_피지컬",
    descriptionEn: "#Photo_Master #Another_Level_Physical",
    profileImage: getInfluencerImagePath("gyeoudi"),
    coverImage: getInfluencerImagePath("gyeoudi"),
    bio: "독보적인 분위기, 일상마저 화보로 만드는 모델. 스크롤을 멈추게 하는 그녀의 감각적인 비주얼, 그 정점을 VROOK에서 만나보세요.",
    bioEn: "A model with a unique atmosphere who turns even daily life into a pictorial. Meet the pinnacle of her sensuous visuals that make you stop scrolling at VROOK.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
    socialLinks: [
      "https://www.instagram.com/winter_28270?igsh=OXUyejk3MG05Zmx3&utm_source=qr",
      "https://www.patreon.com/c/winterD/membership?showCustomPledge=true",
      "https://www.youtube.com/@winterD",
      "https://cafe.naver.com/winterd?tc=shared_link",
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
    description: "#만능크리에이터 #서브컬쳐_여신",
    descriptionEn: "#Multi_Creator #Subculture_Goddess",
    profileImage: getInfluencerImagePath("momorina"),
    coverImage: getInfluencerImagePath("momorina"),
    bio: "일러스트는 기본, 룩북과 피규어 리뷰까지 섭렵한 만능 크리에이터, 모모리나. 그녀가 사랑하는 모든 것들을 VROOK에서 가장 가까이 만나보세요.",
    bioEn: "An all-around creator who has mastered everything from illustrations to lookbooks and figure reviews. Meet everything she loves closest at VROOK.",
    category: "Beauty & Makeup",
    categoryKey: "beautyMakeup",
    socialLinks: [
      "https://www.youtube.com/@momo_rina",
      "https://x.com/_momo_rina_",
      "https://www.patreon.com/momorina"
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
    description: "#러블리끝판왕 #심쿵주의보",
    descriptionEn: "#Lovely_Ultimate #Heart_Flutter_Alert",
    profileImage: getInfluencerImagePath("ssoblly"),
    coverImage: getInfluencerImagePath("ssoblly"),
    bio: "이름처럼 사랑스러운, 당신의 '최애'가 될 모델. 청순함과 섹시함을 넘나드는 그녀의 다채로운 매력에 푹 빠져보세요.",
    bioEn: "A model as lovely as her name, who will become your 'favorite'. Fall deeply into her diverse charms that cross between innocence and sexiness.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
    socialLinks: [
      "https://www.instagram.com/leeesovelys2/",
      "https://www.youtube.com/channel/UCO2GVjlhscG3hxfOZYUYLxg",
      "https://www.patreon.com/leeesovely",
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
    description: "#하이패션모델 #압도적인_아우라",
    descriptionEn: "#High_Fashion_Model #Overwhelming_Aura",
    profileImage: getInfluencerImagePath("yanghyewon"),
    coverImage: getInfluencerImagePath("yanghyewon"),
    bio: "시선을 압도하는 카리스마, 경계 없는 스펙트럼의 모델. 강렬한 눈빛과 독보적인 아우라, 그녀가 선보이는 새로운 아트를 VROOK에서 확인하세요.",
    bioEn: "A model with overwhelming charisma and boundless spectrum. Check out the new art she presents with intense eyes and unique aura at VROOK.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
    socialLinks: [
      "https://www.instagram.com/h.xon_y/",
      "https://www.threads.com/@h.xon_y?xmt=AQF0A8GMNAFZls4J8v0hNwYl65FgX_h-nDSS_5yA8Zu6QMg"
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
    description: "#엉뚱발랄_스트리머 #예측불가_매력",
    descriptionEn: "#Quirky_Streamer #Unpredictable_Charm",
    profileImage: getInfluencerImagePath("kkyunyangnyang"),
    coverImage: getInfluencerImagePath("kkyunyangnyang"),
    bio: "예측불허! 톡톡 튀는 매력의 스트리머. 언제나 유쾌한 그녀와의 소통, VROOK에서는 더욱 생생하고 특별한 모습으로 함께합니다.",
    bioEn: "Unpredictable! A streamer with sparkling charm. Always cheerful communication with her, at VROOK we're together in a more vivid and special way.",
    category: "Gaming & Entertainment",
    categoryKey: "gamingEntertainment",
    socialLinks: [
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
    description: "#콘셉트_장인 #천의얼굴",
    descriptionEn: "#Concept_Master #Thousand_Faces",
    profileImage: getInfluencerImagePath("jeongdabyeol"),
    coverImage: getInfluencerImagePath("jeongdabyeol"),
    bio: "코스프레부터 룩북까지, 어떤 콘셉트든 완벽히 소화하는 '천의 얼굴'. 그녀의 끝없는 변신을 VROOK에서 가장 먼저 만나보세요.",
    bioEn: "From cosplay to lookbooks, the 'thousand faces' who perfectly digests any concept. Meet her endless transformations first at VROOK.",
    category: "Art & Design",
    categoryKey: "artDesign",
    socialLinks: [
      "https://www.instagram.com/jdabyeol2",
      "https://www.tiktok.com/@.dabyeol2",
      "https://www.youtube.com/@dainxodo"
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
    description: "#매혹적인_눈빛 #프로페셔널_모델",
    descriptionEn: "#Enchanting_Eyes #Professional_Model",
    profileImage: getInfluencerImagePath("ina"),
    coverImage: getInfluencerImagePath("ina"),
    bio: "깊은 눈빛으로 모든 콘셉트를 소화하는 프로 모델. 한 번 보면 잊을 수 없는 그녀의 매혹적인 순간들을 VROOK에서 독점 공개합니다.",
    bioEn: "A professional model who digests all concepts with deep eyes. Exclusively reveal her fascinating moments that you can't forget once you see them at VROOK.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
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
    description: "#치명적인_매력 #글래머러스_아이콘",
    descriptionEn: "#Fatal_Charm #Glamorous_Icon",
    profileImage: getInfluencerImagePath("cuina"),
    coverImage: getInfluencerImagePath("cuina"),
    bio: "모든 시선을 단숨에 사로잡는 고혹적인 매력의 모델, 큐이나. 그녀가 만들어내는 치명적인 아름다움을 VROOK에서 직접 확인하세요.",
    bioEn: "A model with seductive charm that captivates all eyes at once, Cuina. Check out the fatal beauty she creates directly at VROOK.",
    category: "Fashion & Lifestyle",
    categoryKey: "fashionLifestyle",
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
    description: "#반전매력 #친근한_겜방언니",
    descriptionEn: "#Reverse_Charm #Friendly_Gaming_Sister",
    profileImage: getInfluencerImagePath("trollya"),
    coverImage: getInfluencerImagePath("trollya"),
    bio: "털털함 속에 숨겨진 사랑스러움, 게임 스트리머. 옆집 언니 같은 친근함, VROOK에서는 그녀의 새로운 모습을 발견할 수 있습니다.",
    bioEn: "Loveliness hidden in frankness, a game streamer. The friendliness of a next-door sister, at VROOK you can discover her new side.",
    category: "Gaming & Entertainment",
    categoryKey: "gamingEntertainment",
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