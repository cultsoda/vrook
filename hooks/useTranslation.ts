"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 통합 번역 데이터를 직접 정의 (import 대신)
const translations = {
  "common": {
    "vrook": { "ko": "VROOK", "en": "VROOK" },
    "back": { "ko": "돌아가기", "en": "Back" },
    "purchase": { "ko": "구매하기", "en": "Purchase" },
    "viewProduct": { "ko": "상품 보러가기", "en": "View Product" },
    "followers": { "ko": "팔로워", "en": "Followers" }
  },
  "home": {
    "title": { "ko": "VROOK - VR 셀럽 화보 플랫폼", "en": "VROOK - VR Celebrity Photo Platform" },
    "subtitle": { "ko": "VR 셀럽 화보 - 혁신적 콘텐츠가 추가된 상품입니다", "en": "VR Celebrity Photos - Revolutionary content platform" },
    "description": { "ko": "VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달합니다", "en": "Delivering new immersive experiences to fans through VR videos and AI photos" },
    "vrExperience": { "ko": "VR 체험", "en": "VR Experience" },
    "aiPhotos": { "ko": "AI 화보", "en": "AI Photos" },
    "aiPhotosDesc": { "ko": "AI 기술로 생성된 창의적이고 독특한 합성 화보", "en": "Creative and unique composite pictorial created with AI technology" },
    "celebContent": { "ko": "셀럽 콘텐츠", "en": "Celebrity Content" },
    "serviceComponents": { "ko": "VROOK 서비스 구성", "en": "VROOK Service Components" },
    "vrVideos": { "ko": "VR 영상", "en": "VR Videos" },
    "vrVideosDesc": { "ko": "몰입감 있는 VR 기술로 제작된 독점 영상 콘텐츠", "en": "Exclusive video content created with immersive VR technology" },
    "digitalPhotos": { "ko": "디지털 사진", "en": "Digital Photos" },
    "digitalPhotosDesc": { "ko": "고품질 2D 사진으로 구성된 프리미엄 화보 콘텐츠", "en": "Premium photo content composed of high-quality 2D photos" },
    "specialVideos": { "ko": "메이킹 영상", "en": "Making Videos" },
    "specialVideosDesc": { "ko": "독점 촬영된 프리미엄 화보 영상 콘텐츠", "en": "Premium photo video content with exclusive filming" },
    "influencers": { "ko": "인플루언서", "en": "Influencers" },
    "influencersDesc": { "ko": "9명의 다양한 분야 인플루언서들의 독점 VR 콘텐츠를 만나보세요", "en": "Meet exclusive VR content from 9 influencers in various fields" },
    "footerDesc": { "ko": "VR 셀럽 화보 플랫폼 - 새로운 디지털 경험의 시작", "en": "VR Celebrity Photo Platform - The beginning of a new digital experience" }
  },
  "influencer": {
    "productSelection": { "ko": "상품 선택", "en": "Product Selection" },
    "productSelectionDesc": { "ko": "의 다양한 콘텐츠를 미리 확인하고 원하는 패키지를 선택하여 구매할 수 있습니다", "en": "'s various content can be previewed and purchased as a package." },
    "photoSet": { "ko": "화보 사진", "en": "Photo Set" },
    "photoSetDesc": { "ko": "고품질 프로페셔널 화보 사진 20장", "en": "20 high-quality professional photo collection" },
    "bcuts": { "ko": "B컷 화보", "en": "B-Cut Photos" },
    "bcutsDesc": { "ko": "촬영 과정에서 나온 자연스러운 B컷 화보", "en": "Natural B-cut photos from the shooting process" },
    "video": { "ko": "화보 영상", "en": "Photo Video" },
    "videoDesc": { "ko": "프리미엄 화보 촬영 과정과 비하인드 스토리", "en": "Premium photo shooting process and behind-the-scenes stories" },
    "vrVideo": { "ko": "VR 영상", "en": "VR Video" },
    "vrVideoDesc": { "ko": "몰입감 있는 VR 기술로 제작된 독점 영상", "en": "Exclusive video created with immersive VR technology" },
    "vrFullVideo": { "ko": "VR 영상(풀버전)", "en": "VR Video (Full Version)" },
    "vrFullVideoDesc": { "ko": "완전한 VR 경험을 제공하는 풀버전 영상", "en": "Full version video providing complete VR experience" },
    "aiPhotos": { "ko": "AI 화보", "en": "AI Photos" },
    "aiPhotosDesc": { "ko": "AI 기술로 생성된 창의적이고 독특한 합성 화보", "en": "Creative and unique synthetic photos generated with AI technology" },
    "purchaseFromXromeda": { "ko": "XROMEDA에서 구매하기", "en": "Purchase from XROMEDA" },
    "packageGuide": { "ko": "패키지 안내", "en": "Package Guide" },
    "packageGuideDesc": { "ko": "다양한 패키지로 더욱 알찬 콘텐츠를 만나보세요. 원하는 콘텐츠가 포함된 패키지를 선택하여 구매하실 수 있습니다.", "en": "Meet richer content with various packages. Choose and purchase a package that includes the content you want." },
    "packageBenefits": { "ko": "💡 패키지 혜택", "en": "💡 Package Benefits" },
    "discountBenefit": { "ko": "할인 혜택", "en": "Discount Benefits" },
    "discountDesc": { "ko": "개별 구매 대비 최대 30% 할인", "en": "Up to 30% discount compared to individual purchases" },
    "additionalBenefit": { "ko": "추가 혜택", "en": "Additional Benefits" },
    "additionalDesc": { "ko": "VR HMD 증정 및 배송비 무료", "en": "VR HMD gift and free shipping" },
    "specialBenefit": { "ko": "특별 혜택", "en": "Special Benefits" },
    "specialDesc": { "ko": "팬미팅 참여 기회 제공", "en": "Fan meeting participation opportunities" },
    "purchaseProcess": { "ko": "구매 프로세스", "en": "Purchase Process" },
    "step1": { "ko": "상품 선택", "en": "Product Selection" },
    "step1Desc": { "ko": "원하는 상품을 선택하고 구매 버튼을 클릭합니다", "en": "Select the desired product and click the purchase button" },
    "step2": { "ko": "XROMEDA 이동", "en": "Move to XROMEDA" },
    "step2Desc": { "ko": "XROMEDA 플랫폼으로 자동 이동됩니다", "en": "Automatically move to XROMEDA platform" },
    "step3": { "ko": "결제 완료", "en": "Payment Complete" },
    "step3Desc": { "ko": "결제 정보를 입력하고 구매를 완료합니다", "en": "Enter payment information and complete the purchase" },
    "notFound": { "ko": "인플루언서를 찾을 수 없습니다", "en": "Influencer not found" },
    "backToHome": { "ko": "홈으로 돌아가기", "en": "Back to Home" }
  },
  "categories": {
    "fashionLifestyle": { "ko": "패션 & 라이프스타일", "en": "Fashion & Lifestyle" },
    "beautyMakeup": { "ko": "뷰티 & 메이크업", "en": "Beauty & Makeup" },
    "fitnessWellness": { "ko": "피트니스 & 웰니스", "en": "Fitness & Wellness" },
    "musicDance": { "ko": "음악 & 댄스", "en": "Music & Dance" },
    "foodCooking": { "ko": "푸드 & 쿠킹", "en": "Food & Cooking" },
    "travelAdventure": { "ko": "여행 & 어드벤처", "en": "Travel & Adventure" },
    "artDesign": { "ko": "아트 & 디자인", "en": "Art & Design" },
    "gamingEntertainment": { "ko": "게임 & 엔터테인먼트", "en": "Gaming & Entertainment" },
    "educationLifestyle": { "ko": "교육 & 라이프스타일", "en": "Education & Lifestyle" }
  },
  "productBadges": {
    "photos": { "ko": "20장", "en": "20 pics" },
    "bcuts": { "ko": "B컷", "en": "B-cut" },
    "video": { "ko": "HD 영상", "en": "HD Video" },
    "vr": { "ko": "VR 체험", "en": "VR Experience" },
    "vrFull": { "ko": "풀버전", "en": "Full Ver." },
    "ai": { "ko": "3장", "en": "3 pics" }
  },
  "packages": {
    "basic": { "ko": "브이룩 패키지", "en": "VROOK Package" },
    "special": { "ko": "브이룩 스페셜 패키지", "en": "VROOK Special Package" },
    "all": { "ko": "브이룩 ALL 패키지", "en": "VROOK ALL Package" },
    "recommended": { "ko": "추천", "en": "Recommended" },
    "price": { "ko": "(VAT 포함)", "en": "(incl. VAT)" },
    "priceFormat": { "ko": "₩{krw} / ${usd}", "en": "₩{krw} / ${usd}" },
    "features": {
      "photos20": { "ko": "화보 사진 20장", "en": "20 Photo Collection" },
      "bcuts20": { "ko": "B컷 화보 사진 20장", "en": "20 B-Cut Photo Collection" },
      "photoVideo1": { "ko": "화보 영상 1개", "en": "1 Photo Video" },
      "vrVideo1": { "ko": "VR 영상 1개", "en": "1 VR Video" },
      "vrVideoFull1": { "ko": "VR 영상(풀버전) 1개", "en": "1 VR Video (Full Version)" },
      "vrHmdGift": { "ko": "몰입형 VR HMD 특별 증정 (국내 배송만 가능)", "en": "Immersive VR HMD Special Gift (Korea shipping only)" },
      "aiPhotos3": { "ko": "AI 스페셜 화보 3장", "en": "3 AI Special Photos" },
      "photocardGift": { "ko": "실물 포토카드 증정 (국내 배송만 가능)", "en": "Physical Photo Card Gift (Korea shipping only)" }
    }
  }
}

interface TranslationContextType {
  t: (key: string) => string
  locale: 'ko' | 'en'
  changeLanguage: (locale: 'ko' | 'en') => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocale] = useState<'ko' | 'en'>('ko')

  // 초기 언어 설정 로드
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('vrook-locale') as 'ko' | 'en'
      console.log('Loading saved locale:', savedLocale)
      if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
        setLocale(savedLocale)
      }
    } catch (error) {
      console.error('localStorage error:', error)
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: any = translations
    
    // 중첩된 키를 따라가며 번역 객체 찾기
    for (const k of keys) {
      translation = translation?.[k]
    }
    
    // 번역 객체가 있고 현재 언어 키가 있으면 해당 언어의 번역 반환
    if (translation && typeof translation === 'object' && translation[locale]) {
      console.log(`Translating "${key}" (${locale}):`, translation[locale])
      return translation[locale]
    }
    
    // 번역이 없으면 키 자체를 반환
    console.log(`Translation not found for "${key}" (${locale})`)
    return key
  }

  const changeLanguage = (newLocale: 'ko' | 'en') => {
    console.log('Changing language from', locale, 'to', newLocale)
    setLocale(newLocale)
    
    try {
      localStorage.setItem('vrook-locale', newLocale)
      console.log('Language saved to localStorage:', newLocale)
    } catch (error) {
      console.error('localStorage save error:', error)
    }
  }

  return React.createElement(
    TranslationContext.Provider,
    { value: { t, locale, changeLanguage } },
    children
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}