// app/influencer/[id]/client.tsx (적응형 그리드 적용)
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Play, Eye, Sparkles, ExternalLink, Camera, Image } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"
import { usePurchaseControl } from "@/hooks/usePurchaseControl"
import { toast } from 'sonner'
import type { Influencer, Package } from "@/types/influencer"
import { trackEvent } from "@/lib/ga";

interface InfluencerDetailClientProps {
  influencer: Influencer
  packages: Package[]
}

export default function InfluencerDetailClient({ influencer, packages }: InfluencerDetailClientProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { isPurchaseEnabled, showPurchaseUnavailableAlert } = usePurchaseControl()
  const [activeTab, setActiveTab] = useState<'packages' | 'products'>('packages')

  const canPurchase = isPurchaseEnabled(influencer.id)

  // 모모리나와 쏘블리는 VR 영상이 없음
  const hasVrVideo = !['momorina', 'ssoblly'].includes(influencer.id)

  const getProductLink = (influencerId: string, productType: string): string => {
    const productLinks: Record<string, Record<string, string>> = {
      gyeoudi: {
        photos: "https://xromeda.com/play/2d/abgt23csrh6ji21e",        // 화보A (메인 화보)
        bcuts: "https://xromeda.com/play/2d/grgx7le6efx0vaha",         // 화보B (B컷)
        video: "https://xromeda.com/play/media/cc08lh3sir8wo9pz",       // 메이킹영상
        vr: "https://xromeda.com/play/media/0fevoxlaxxfbvqjd",          // VR01 (일반 VR)
        vrFull: "https://xromeda.com/play/media/bbrzw24imaijxzzs",     // VR02 (풀버전)
        ai: "https://xromeda.com/play/2d/q1ajrxwz6tfxoqyq",            // AI포카
      },
      momorina: {
        photos: "https://xromeda.com/play/2d/r9dtvl07xworbq05",
        bcuts: "https://xromeda.com/play/2d/ughm42d2i90a73v5",
        video: "https://xromeda.com/play/media/rnaob4fof6tyso3b",
        vrFull: "https://xromeda.com/play/media/ghr9htn0gql0r4do",
        ai: "https://xromeda.com/play/2d/1z025ba608gl91pr"
      },
      ssoblly: {
        photos: "https://stg.xromeda.com/play/2d/default-photo", // 임시 링크
        bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
        video: "https://stg.xromeda.com/play/media/default-video",
        vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
        ai: "https://stg.xromeda.com/play/2d/default-ai"
      },
      cuina: {
        photos: "https://xromeda.com/play/2d/t31xrh1uctjtbxuv",        // 화보A (메인 화보)
        bcuts: "https://xromeda.com/play/2d/b3tl63wlb2uabvln",         // 화보B (B컷)
        video: "https://xromeda.com/play/media/29siky981w4px159",       // 메이킹영상
        vr: "https://xromeda.com/play/media/033himk6wv5a9qvd",          // VR01 (일반 VR)
        vrFull: "https://xromeda.com/play/media/744p9flyx33asxzj",         // VR02 (풀버전)
        ai: "https://xromeda.com/play/2d/wvbgjitz8k9cbgn1",            // AI포카
      },
      jeongdabyeol: {
        photos: "https://xromeda.com/play/2d/0l86vu6mrnwplx1f",        // 화보A
        bcuts: "https://xromeda.com/play/2d/v7aw0z8wlsyfgz5l",         // 화보B  
        video: "https://xromeda.com/play/media/rn020w6htkyb8e5s",       // 메이킹영상
        vr: "https://xromeda.com/play/media/o6ssrluzwqzc3cg6",          // VR01
        vrFull: "https://xromeda.com/play/media/c7u9rfo4yt59bo19",      // VR02
        ai: "https://xromeda.com/play/2d/9ig2bv5lhf8tm08k",            // AI포카
      },
      yanghyewon: {
        photos: "https://xromeda.com/play/2d/acedewp9x2wium1g",        // 화보A (메인 화보)
        bcuts: "https://xromeda.com/play/2d/t79zjw4u3i5gf0rh",         // 화보B (B컷)
        video: "https://xromeda.com/play/media/fl1l7c63nlysd4ru",       // 메이킹영상
        vr: "https://xromeda.com/play/media/ylpo3yiwzblx7gh8",          // VR01 (일반 VR)
        vrFull: "https://xromeda.com/play/media/fp6kotvspbnkjab9",     // VR02 (풀버전)
        ai: "https://xromeda.com/play/2d/hecf2h1no9q255i2",            // AI포카
      },
      kkyunyangnyang: {
        photos: "https://xromeda.com/play/2d/q4eudj8e0nryr1r2",        // 화보A (메인 화보)
        bcuts: "https://xromeda.com/play/2d/6ur8mhgcti5avfza",         // 화보B (B컷)
        video: "https://xromeda.com/play/media/blj8297bt1xbevzy",       // 메이킹영상
        vr: "https://xromeda.com/play/media/wjorca4im4h4j81p",          // VR01 (일반 VR)
        vrFull: "https://xromeda.com/play/media/bpgtquoexqdsus0b",      // VR02 (풀버전)
        ai: "https://xromeda.com/play/2d/aw1ndp1r12lv3a2p",            // AI포카
      },
      tsxina: {
        photos: "https://xromeda.com/play/2d/pyazyiwkqngdum58",        // 화보A (메인 화보)
        bcuts: "https://xromeda.com/play/2d/y5xpa5x4egaiu46b",         // 화보B (B컷)
        video: "https://xromeda.com/play/media/n7jlqf1ab3td97ci",       // 메이킹영상
        vr: "https://xromeda.com/play/media/f4wusyrxlca51fng",          // VR01 (일반 VR)
        vrFull: "https://xromeda.com/play/media/w19ge5uc4yhz8ide",      // VR02 (풀버전)
        ai: "https://xromeda.com/play/2d/1vbdjg0qckrsq3px",            // AI포카
      },
      default: {
        photos: "https://stg.xromeda.com/play/2d/default-photo",
        bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
        video: "https://stg.xromeda.com/play/media/default-video",
        vr: "https://stg.xromeda.com/play/media/default-vr",
        vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
        ai: "https://stg.xromeda.com/play/2d/default-ai"
      }
    }

    const links = productLinks[influencerId] || productLinks.default
    return links[productType] || links.photos
  }

  const handleProductClick = (productType: string) => {
    if (!canPurchase) {
      toast.error(t('influencer.contentNotReady'))
      return
    }
    // GA 이벤트 전송 코드 추가
    trackEvent('click_product', { 
      influencer_name: influencer.name, 
      product_id: productType 
    });
    
    const link = getProductLink(influencer.id, productType)
    window.open(link, "_blank", "noopener,noreferrer")
  }

  const handlePackagePurchase = () => {
  if (!canPurchase) {
    toast.error(t('influencer.contentNotReady'))
    return
  }
  
  // 패키지의 대표 상품(화보)으로 이동
  const link = getProductLink(influencer.id, 'photos')
  window.open(link, "_blank", "noopener,noreferrer")
  }

      

  // 콘텐츠 구성 - VR 영상 여부에 따라 다르게 구성
  const products = hasVrVideo ? [
    {
      id: "photos",
      name: t(`influencers.${influencer.id}.products.photoSet.name`),
      description: t(`influencers.${influencer.id}.products.photoSet.description`),
      thumbnail: influencer.galleryImages[0],
      icon: <Camera className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.photos'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bcuts",
      name: t(`influencers.${influencer.id}.products.bcuts.name`),
      description: t(`influencers.${influencer.id}.products.bcuts.description`),
      thumbnail: influencer.galleryImages[1],
      icon: <Image className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.bcuts'),
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "video",
      name: t(`influencers.${influencer.id}.products.video.name`),
      description: t(`influencers.${influencer.id}.products.video.description`),
      thumbnail: influencer.videoThumbnail,
      icon: <Play className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.video'),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vr",
      name: t(`influencers.${influencer.id}.products.vrVideo.name`),
      description: t(`influencers.${influencer.id}.products.vrVideo.description`),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.vr'),
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "vrFull",
      name: t(`influencers.${influencer.id}.products.vrFullVideo.name`),
      description: t(`influencers.${influencer.id}.products.vrFullVideo.description`),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.vrFull'),
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "ai",
      name: t(`influencers.${influencer.id}.products.aiPhotos.name`),
      description: t(`influencers.${influencer.id}.products.aiPhotos.description`),
      thumbnail: influencer.aiSamples[0],
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.ai'),
      color: "from-orange-500 to-red-500",
    },
  ] : [
    // 모모리나, 쏘블리용 (VR 영상 제외)
    {
      id: "photos",
      name: t(`influencers.${influencer.id}.products.photoSet.name`),
      description: t(`influencers.${influencer.id}.products.photoSet.description`),
      thumbnail: influencer.galleryImages[0],
      icon: <Camera className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.photos'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bcuts",
      name: t(`influencers.${influencer.id}.products.bcuts.name`),
      description: t(`influencers.${influencer.id}.products.bcuts.description`),
      thumbnail: influencer.galleryImages[1],
      icon: <Image className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.bcuts'),
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "video",
      name: t(`influencers.${influencer.id}.products.video.name`),
      description: t(`influencers.${influencer.id}.products.video.description`),
      thumbnail: influencer.videoThumbnail,
      icon: <Play className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.video'),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vrFull",
      name: t(`influencers.${influencer.id}.products.vrFullVideo.name`),
      description: t(`influencers.${influencer.id}.products.vrFullVideo.description`),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.vrFull'),
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "ai",
      name: t(`influencers.${influencer.id}.products.aiPhotos.name`),
      description: t(`influencers.${influencer.id}.products.aiPhotos.description`),
      thumbnail: influencer.aiSamples[0],
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.ai'),
      color: "from-orange-500 to-red-500",
    },
  ]

    // 🚀 적응형 그리드 클래스 - 모든 인플루언서 동일한 열 구조 유지
  const getGridClass = () => {
    // 모바일 1열, 태블릿 2열, PC는 정밀 제어를 위해 12열 사용
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"
  }

  // 🎯 5개 콘텐츠일 때 마지막 줄 중앙 정렬을 위한 스타일
  const getGridStyles = () => {
    if (products.length === 5) {
      return {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(1, 1fr)', // 모바일: 1열
        '@media (min-width: 640px)': {
          gridTemplateColumns: 'repeat(2, 1fr)', // 태블릿: 2열
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: 'repeat(3, 1fr)', // PC: 3열
        }
      }
    }
    return {}
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Header - 모바일 최적화 */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* 왼쪽 - 뒤로가기 버튼 */}
            <div className="flex-1 flex justify-start">
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")} 
                className="text-white hover:text-purple-400 p-2 md:px-4"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Button>
            </div>
            
            {/* 중앙 - VROOK 로고 (완전 중앙 정렬) */}
            <div className="flex-1 flex justify-center">
              <button 
                onClick={() => router.push("/")}
                className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                {t('common.vrook')}
              </button>
            </div>
            
            {/* 오른쪽 - 언어 스위처 */}
            <div className="flex-1 flex justify-end">
              <div className="scale-75 md:scale-100 origin-right">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 구매 불가 알림 배너 */}
      {!canPurchase && (
        <div className="bg-yellow-600/20 border-b border-yellow-600/30 px-3 md:px-4 py-2 md:py-3">
          <div className="container mx-auto text-center">
            <p className="text-yellow-200 text-xs md:text-sm">
              {t('influencer.unavailableBanner')}
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - 모바일 최적화 */}
      <section className="py-6 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* 모바일에서는 이미지가 먼저 표시, 모바일 프로필 이미지 width 100% 수정 */}
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div className="w-full md:w-96 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={influencer.coverImage}
                  alt={`${influencer.name} - VROOK VR 셀럽 화보`}
                  className="w-full h-auto object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=600&width=600";
                  }}
                />
              </div>
            </div>
            
            {/* 텍스트 정보 */}
            <div className="w-full text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                {influencer.name}
              </h1>
              <p className="text-lg md:text-xl text-purple-200 mb-4 md:mb-6">
                {t(influencer.descriptionKey)}
              </p>
              <p className="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base px-2 lg:px-0">
                {t(influencer.bioKey)}
              </p>
              
              {/* SNS 링크 - 모바일 최적화 */}
              {influencer.socialLinks && influencer.socialLinks.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                    {influencer.socialLinks.map((link, index) => {
                      const getPlatformInfo = (url: string) => {
                        if (url.includes('instagram.com')) return { 
                          name: 'Instagram', 
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          ),
                          color: 'text-pink-400 hover:text-pink-300'
                        }
                        if (url.includes('youtube.com') || url.includes('youtu.be')) return {
                          name: 'YouTube',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          ),
                          color: 'text-red-400 hover:text-red-300'
                        }
                        if (url.includes('twitter.com') || url.includes('x.com')) return {
                          name: 'Twitter/X',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          ),
                          color: 'text-blue-400 hover:text-blue-300'
                        }
                        if (url.includes('tiktok.com')) return {
                          name: 'TikTok',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                          ),
                          color: 'text-purple-400 hover:text-purple-300'
                        }
                        if (url.includes('twitch.tv')) return {
                          name: 'Twitch',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                            </svg>
                          ),
                          color: 'text-purple-500 hover:text-purple-400'
                        }
                        if (url.includes('sooplive.co.kr') || url.includes('chzzk.naver.com')) return {
                          name: 'Live Stream',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          ),
                          color: 'text-green-400 hover:text-green-300'
                        }
                        if (url.includes('patreon.com')) return {
                          name: 'Patreon',
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z"/>
                            </svg>
                          ),
                          color: 'text-orange-400 hover:text-orange-300'
                        }
                        // 기본 링크 아이콘
                        return { 
                          name: 'Link', 
                          icon: (
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                            </svg>
                          ),
                          color: 'text-gray-400 hover:text-gray-300'
                        }
                      }
                      
                      const platformInfo = getPlatformInfo(link)
                      
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/60 hover:bg-slate-700/60 transition-all duration-200 backdrop-blur-sm border border-slate-600/30 hover:scale-110 ${platformInfo.color}`}
                          title={platformInfo.name}
                        >
                          {platformInfo.icon}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 탭 네비게이션 - 모바일 추가 */}
      <section className="px-4 mb-6 md:hidden">
        <div className="container mx-auto">
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'packages' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('influencer.tabs.packages')}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'products' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('influencer.tabs.contents')}
            </button>
          </div>
        </div>
      </section>

      {/* Package Guide - 모바일에서 조건부 표시 */}
      <section className={`py-8 md:py-16 px-4 bg-slate-900/50 ${activeTab !== 'packages' ? 'hidden md:block' : ''}`}>
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
            {t('influencer.packageGuide')}
          </h2>
          <p className="text-center text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base px-2">
            {t('influencer.packageGuideDesc')}
          </p>

          {/* 패키지 카드들 - 모바일에서 세로 스크롤 */}
          <div className="md:grid md:grid-cols-3 md:gap-6 mb-6 md:mb-8 space-y-4 md:space-y-0">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative"
              >
                <CardContent className="p-0">
                  {/* 패키지 이미지 */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={`/images/products/${influencer.id}_${pkg.id}.webp`}
                      alt={`${influencer.name} ${t(`packages.${pkg.id}`)}`}
                      className="w-full h-auto md:h-auto object-cover"
                      style={{ aspectRatio: '16/9' }}
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=450&width=800";
                      }}
                    />
                  </div>
                  
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-white text-lg md:text-xl">{t(`packages.${pkg.id}`)}</CardTitle>
                    <div className="text-xl md:text-2xl font-bold text-purple-400">
                      ₩{pkg.price.krw.toLocaleString()} / ${pkg.price.usd}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400">{t('packages.price')}</div>
                  </CardHeader>
                  
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <ul className="space-y-2">
                      {pkg.features.map((featureKey, featureIndex) => {
                        // 패키지별 새 기능 표시 로직
                        const isNewFeature = pkg.newFeatures?.includes(featureKey)
                        
                        return (
                          <li key={featureIndex} className="flex items-start text-slate-300 text-xs md:text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 flex-shrink-0 mt-2" />
                            <span className={isNewFeature ? "font-bold text-purple-300" : ""}>
                              {isNewFeature && <span className="text-purple-400 mr-1">✨</span>}
                              {t(`packages.features.${featureKey}`)}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <Button
              onClick={handlePackagePurchase}
              className={`px-6 md:px-8 py-3 text-base md:text-lg font-bold w-full md:w-auto ${
                canPurchase 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" 
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!canPurchase}
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {canPurchase ? t('influencer.purchaseFromXromeda') : t('influencer.salePreparation')}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Selection - 🚀 적응형 그리드 적용 */}
      <section className={`py-8 md:py-16 px-4 ${activeTab !== 'products' ? 'hidden md:block' : ''}`}>
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
            {t('influencer.productGuide')}
          </h2>
          <p className="text-center text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base px-2">
            {t('influencer.productGuideDesc')}
          </p>

          {/* 🎯 수정된 균형 잡힌 그리드 (v6.2 - 최종 완성) */}
          <div className={`grid gap-4 md:gap-6 ${getGridClass()}`}>
            {products.map((product, index) => {
              const isFiveItems = products.length === 5;
              const isFourthItem = index === 3;
              const isFifthItem = index === 4;

              // 재사용을 위해 카드 컴포넌트를 변수로 정의합니다.
              const productCard = (
                <Card
                  className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 group cursor-pointer w-full h-full ${
                    canPurchase ? "hover:scale-105" : ""
                  }`}
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg h-48 md:h-56">
                      <img
                        src={product.thumbnail}
                        alt={`${influencer.name} ${product.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=300&width=400";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r ${product.color} p-1.5 md:p-2 rounded-full`}>
                        {product.icon}
                      </div>
                      <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-slate-900/80 text-white text-xs">
                        {product.badge}
                      </Badge>
                      {canPurchase && (
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                          {product.id === "video" || product.id === "vr" || product.id === "vrFull" ? (
                            <Play className="w-10 h-10 md:w-12 md:h-12 text-white" />
                          ) : (
                            <Eye className="w-10 h-10 md:w-12 md:h-12 text-white" />
                          )}
                        </div>
                      )}
                      {!canPurchase && (
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                          <div className="text-white text-center bg-black/80 px-4 py-3 rounded-lg border border-yellow-400/50 backdrop-blur-sm">
                            <div className="text-base md:text-lg font-semibold text-yellow-300">{t('influencer.comingSoon')}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-base md:text-lg font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-xs md:text-sm text-slate-300 line-clamp-2">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );

              // 12칸 그리드 시스템에 맞춘 카드 배치 로직
              return (
                <div
                  key={product.id}
                  className={`
                    lg:col-span-4
                    ${isFiveItems && isFourthItem ? 'lg:col-start-3' : ''}
                    ${isFiveItems && isFifthItem ? 'sm:col-span-2 sm:flex sm:justify-center lg:col-span-4 lg:col-start-auto' : ''}
                  `}
                >
                  <div className={isFiveItems && isFifthItem ? "w-full sm:max-w-sm" : ""}>
                    {productCard}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purchase Process - 간소화 */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="p-4 md:p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-white font-semibold mb-4 md:mb-6 text-center text-base md:text-lg">
              {t('influencer.purchaseProcess')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { step: 1, icon: Eye, titleKey: 'step1', descKey: 'step1Desc', color: 'from-purple-500 to-pink-500' },
                { step: 2, icon: ExternalLink, titleKey: 'step2', descKey: 'step2Desc', color: 'from-blue-500 to-cyan-500' },
                { step: 3, icon: Users, titleKey: 'step3', descKey: 'step3Desc', color: 'from-green-500 to-emerald-500' },
              ].map((item, index) => (
                <div key={item.step} className="text-center relative">
                  <div className="relative mb-3 md:mb-4">
                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3`}>
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2 text-sm md:text-base">
                    {t(`influencer.${item.titleKey}`)}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400">
                    {t(`influencer.${item.descKey}`)}
                  </p>

                  {/* Arrow to next step - 데스크톱에서만 표시 */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 md:top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400">
                      <div className="absolute right-0 top-[-2px] w-0 h-0 border-l-4 border-l-blue-400 border-y-2 border-y-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 모바일 최적화 */}
      <footer className="bg-slate-900 py-8 md:py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button 
                  onClick={() => router.push("/")}
                  className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer border-none bg-transparent"
                >
                  VROOK
                </button>
                <span className="text-slate-500 hidden sm:inline">by</span>
                <a 
                  href="https://xromeda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-105 transform"
                >
                  XROMEDA
                </a>
              </div>
              <p className="text-slate-400 text-sm md:text-base px-4">{t('home.footerDesc')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
