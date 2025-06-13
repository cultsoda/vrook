"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { influencers, getInfluencerPackages } from "@/data/influencers"
import { ArrowLeft, Users, Play, Eye, Sparkles, ExternalLink, ShoppingCart, Camera, Image } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"

export default function InfluencerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t, locale } = useTranslation()

  // 각 상품의 구매 상태를 관리 (실제로는 서버에서 가져와야 함)
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([])

  const influencer = influencers.find((inf) => inf.id === params.id)

  if (!influencer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('influencer.notFound')}</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            {t('influencer.backToHome')}
          </Button>
        </div>
      </div>
    )
  }

  // 해당 인플루언서의 패키지 가격 가져오기
  const packages = getInfluencerPackages(influencer.id)

  // 인플루언서별 상품 링크 매핑
  const influencerProductLinks = {
    gyeoudi: {
      photos: "https://stg.xromeda.com/play/2d/mazvc9h9vrbwm419",
      bcuts: "https://stg.xromeda.com/play/2d/gukqxxyva6vzjuzr",
      video: "https://stg.xromeda.com/play/media/opxtqff6u9wqch1t",
      vr: "https://stg.xromeda.com/play/media/tetf4z2pwdkcsnyi",
      vrFull: "https://stg.xromeda.com/play/media/xo3pg10md1i96fot",
      ai: "https://stg.xromeda.com/play/2d/btq0c4w2jaf0rmox"
    },
    momorina: {
      photos: "https://stg.xromeda.com/play/2d/vpu20s7qpaj1pu6j",
      bcuts: "https://stg.xromeda.com/play/2d/cdysghp7925gxuht",
      video: "https://stg.xromeda.com/play/media/1y6ghrtma0fis6a8",
      vr: "https://stg.xromeda.com/play/media/4lqkzg3rmao1boy4",
      vrFull: "https://stg.xromeda.com/play/media/jyfakgdc2uxubza5",
      ai: "https://stg.xromeda.com/play/2d/d8m4qr1vx1een0cl"
    },
    // 다른 인플루언서들의 기본 링크
    yanghyewon: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    trollya: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    ssoblly: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    kkyunyangnyang: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    ina: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    cuina: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    },
    jeongdabyeol: {
      photos: "https://stg.xromeda.com/play/2d/default-photo",
      bcuts: "https://stg.xromeda.com/play/2d/default-bcuts",
      video: "https://stg.xromeda.com/play/media/default-video",
      vr: "https://stg.xromeda.com/play/media/default-vr",
      vrFull: "https://stg.xromeda.com/play/media/default-vr-full",
      ai: "https://stg.xromeda.com/play/2d/default-ai"
    }
  }

  const handleProductClick = (productType: string) => {
    const currentInfluencerLinks = influencerProductLinks[influencer.id as keyof typeof influencerProductLinks]
    const link = currentInfluencerLinks?.[productType as keyof typeof currentInfluencerLinks] || "https://stg.xromeda.com/play/2d/default"
    window.open(link, "_blank")
  }

  const products = [
    {
      id: "photos",
      name: t('influencer.photoSet'),
      description: t('influencer.photoSetDesc'),
      thumbnail: influencer.galleryImages[0],
      icon: <Camera className="w-6 h-6" />,
      badge: t('productBadges.photos'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bcuts",
      name: t('influencer.bcuts'),
      description: t('influencer.bcutsDesc'),
      thumbnail: influencer.galleryImages[1],
      icon: <Image className="w-6 h-6" />,
      badge: t('productBadges.bcuts'),
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "video",
      name: t('influencer.video'),
      description: t('influencer.videoDesc'),
      thumbnail: influencer.videoThumbnail,
      icon: <Play className="w-6 h-6" />,
      badge: t('productBadges.video'),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vr",
      name: t('influencer.vrVideo'),
      description: t('influencer.vrVideoDesc'),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-6 h-6" />,
      badge: t('productBadges.vr'),
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "vrFull",
      name: t('influencer.vrFullVideo'),
      description: t('influencer.vrFullVideoDesc'),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-6 h-6" />,
      badge: t('productBadges.vrFull'),
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "ai",
      name: t('influencer.aiPhotos'),
      description: t('influencer.aiPhotosDesc'),
      thumbnail: influencer.aiSamples[0],
      icon: <Sparkles className="w-6 h-6" />,
      badge: t('productBadges.ai'),
      color: "from-orange-500 to-red-500",
    },
  ]

  // 현재 언어에 맞는 인플루언서 정보 가져오기
  const getInfluencerDescription = () => {
    return t(influencer.descriptionKey)
  }

  const getInfluencerBio = () => {
    return t(influencer.bioKey)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:text-purple-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          <button 
            onClick={() => router.push("/")}
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            {t('common.vrook')}
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section - 카테고리 뱃지 제거 */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <div className="w-96 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={influencer.coverImage}
                  alt={influencer.name}
                  className="w-full h-auto object-cover object-center"
                  onError={(e) => {
                    // 이미지 로드 실패시 플레이스홀더 사용
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=600&width=600";
                  }}
                />
              </div>
            </div>
            <div>
              {/* 카테고리 뱃지 제거 */}
              <h1 className="text-5xl font-bold text-white mb-4">{influencer.name}</h1>
              <p className="text-xl text-purple-200 mb-6">{getInfluencerDescription()}</p>
              <p className="text-slate-300 mb-6 leading-relaxed">{getInfluencerBio()}</p>
              
              {/* SNS 링크 섹션 */}
              {influencer.socialLinks && influencer.socialLinks.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-3">
                    {influencer.socialLinks.map((link, index) => {
                      // 플랫폼별 아이콘과 이름 매핑
                      const getPlatformInfo = (url: string) => {
                        if (url.includes('instagram.com')) return { name: 'Instagram', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                        if (url.includes('youtube.com') || url.includes('youtu.be')) return { name: 'YouTube', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        if (url.includes('tiktok.com')) return { name: 'TikTok', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                        )}
                        if (url.includes('twitch.tv')) return { name: 'Twitch', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                          </svg>
                        )}
                        if (url.includes('twitter.com') || url.includes('x.com')) return { name: 'X (Twitter)', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        if (url.includes('patreon.com')) return { name: 'Patreon', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z"/>
                          </svg>
                        )}
                        if (url.includes('chzzk.naver.com')) return { name: 'CHZZK', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        )}
                        if (url.includes('sooplive.co.kr')) return { name: 'Soop Live', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                          </svg>
                        )}
                        if (url.includes('cafe.naver.com')) return { name: 'Naver Cafe', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                          </svg>
                        )}
                        if (url.includes('threads.com')) return { name: 'Threads', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.744-1.757-.569-.653-1.42-.998-2.532-1.024-1.542.027-2.634.787-3.248 2.259l-1.854-.551c.762-1.93 2.403-3.044 4.888-3.316.8-.086 1.592-.065 2.347.062 1.515.254 2.731.867 3.613 1.821 1.28 1.38 1.53 3.355 1.261 5.536a5.372 5.372 0 0 1 .176 2.426c-.176 1.715-.947 3.176-2.296 4.343-1.542 1.331-3.593 2.004-6.091 2.002h-.014"/>
                          </svg>
                        )}
                        return { name: 'Link', icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                          </svg>
                        )}
                      }
                      
                      const platformInfo = getPlatformInfo(link)
                      
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-white font-medium transition-colors duration-200 backdrop-blur-sm border border-slate-600/30"
                        >
                          {platformInfo.icon}
                          <span>{platformInfo.name}</span>
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

      {/* Product Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('influencer.productSelection')}</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {influencer.name}{t('influencer.productSelectionDesc')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const isPurchased = purchasedProducts.includes(product.id)

              return (
                <Card
                  key={product.id}
                  className="bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg" style={{ aspectRatio: '16 / 9', height: 'auto' }}>
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          // 이미지 로드 실패시 플레이스홀더 사용
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=300&width=400";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Category Icon */}
                      <div className={`absolute top-3 left-3 bg-gradient-to-r ${product.color} p-2 rounded-full`}>
                        {product.icon}
                      </div>

                      {/* Badge */}
                      <Badge className="absolute top-3 right-3 bg-slate-900/80 text-white">{product.badge}</Badge>

                      {/* Play/View Icon Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        {product.id === "video" || product.id === "vr" || product.id === "vrFull" ? (
                          <Play className="w-12 h-12 text-white" />
                        ) : (
                          <Eye className="w-12 h-12 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-sm text-slate-300 mb-4 line-clamp-2">{product.description}</p>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProductClick(product.id)
                        }}
                        className={`w-full ${
                          isPurchased
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        } text-white`}
                        size="sm"
                      >
                        {isPurchased ? (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            {t('common.viewProduct')}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {t('influencer.purchaseFromXromeda')}
                          </>
                        )}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Package Guide */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('influencer.packageGuide')}</h2>
          <div 
            className="text-center text-slate-300 mb-12 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('influencer.packageGuideDesc') }}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm relative ${
                  pkg.highlight ? "ring-2 ring-purple-400" : ""
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {t('packages.recommended')}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white">{t(`packages.${pkg.id}`)}</CardTitle>
                  <div className="text-2xl font-bold text-purple-400">
                    ₩{pkg.price.krw.toLocaleString()} / ${pkg.price.usd}
                  </div>
                  <div className="text-sm text-slate-400">{t('packages.price')}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((featureKey, index) => {
                      const isNewFeature = pkg.newFeatures?.includes(featureKey)
                      return (
                        <li key={index} className="flex items-center text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 flex-shrink-0" />
                          <span className={isNewFeature ? "font-bold text-purple-300" : ""}>
                            {isNewFeature && <span className="text-purple-400 mr-1">✨</span>}
                            {t(`packages.features.${featureKey}`)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="mt-6 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-white font-semibold mb-6 text-center text-lg">{t('influencer.purchaseProcess')}</h3>
              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* Step 1 */}
                <div className="text-center relative">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2">{t('influencer.step1')}</h4>
                  <p className="text-sm text-slate-400">{t('influencer.step1Desc')}</p>

                  {/* Arrow to next step */}
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400">
                    <div className="absolute right-0 top-[-2px] w-0 h-0 border-l-4 border-l-blue-400 border-y-2 border-y-transparent"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center relative">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2">{t('influencer.step2')}</h4>
                  <p className="text-sm text-slate-400">{t('influencer.step2Desc')}</p>

                  {/* Arrow to next step */}
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400">
                    <div className="absolute right-0 top-[-2px] w-0 h-0 border-l-4 border-l-green-400 border-y-2 border-y-transparent"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2">{t('influencer.step3')}</h4>
                  <p className="text-sm text-slate-400">{t('influencer.step3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => router.push("/")}
                  className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer border-none bg-transparent"
                >
                  VROOK
                </button>
                <span className="text-slate-500">by</span>
                <a 
                  href="https://xromeda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-105 transform"
                >
                  XROMEDA
                </a>
              </div>
              <p className="text-slate-400">{t('home.footerDesc')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}