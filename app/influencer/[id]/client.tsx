// app/influencer/[id]/client.tsx (모바일 최적화 버전)
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
import type { Influencer, Package } from "@/types/influencer"

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

  const getProductLink = (influencerId: string, productType: string): string => {
    const productLinks: Record<string, Record<string, string>> = {
      gyeoudi: {
        photos: "https://stg.xromeda.com/play/2d/mazvc9h9vrbwm419?mode=login&from=ep",
        bcuts: "https://stg.xromeda.com/play/2d/gukqxxyva6vzjuzr?mode=login&from=ep",
        video: "https://stg.xromeda.com/play/media/opxtqff6u9wqch1t?mode=login&from=ep",
        vr: "https://stg.xromeda.com/play/media/tetf4z2pwdkcsnyi?mode=login&from=ep",
        vrFull: "https://stg.xromeda.com/play/media/xo3pg10md1i96fot?mode=login&from=ep",
        ai: "https://stg.xromeda.com/play/2d/btq0c4w2jaf0rmox?mode=login&from=ep"
      },
      momorina: {
        photos: "https://stg.xromeda.com/play/2d/vpu20s7qpaj1pu6j?mode=login&from=ep",
        bcuts: "https://stg.xromeda.com/play/2d/cdysghp7925gxuht?mode=login&from=ep",
        video: "https://stg.xromeda.com/play/media/1y6ghrtma0fis6a8?mode=login&from=ep",
        vr: "https://stg.xromeda.com/play/media/4lqkzg3rmao1boy4?mode=login&from=ep",
        vrFull: "https://stg.xromeda.com/play/media/jyfakgdc2uxubza5?mode=login&from=ep",
        ai: "https://stg.xromeda.com/play/2d/d8m4qr1vx1een0cl?mode=login&from=ep"
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
      showPurchaseUnavailableAlert()
      return
    }
    const link = getProductLink(influencer.id, productType)
    window.open(link, "_blank", "noopener,noreferrer")
  }

  const handlePackagePurchase = () => {
    if (!canPurchase) {
      showPurchaseUnavailableAlert()
      return
    }
    const link = getProductLink(influencer.id, 'photos')
    window.open(link, "_blank", "noopener,noreferrer")
  }

  const products = [
    {
      id: "photos",
      name: t('influencer.photoSet'),
      description: t('influencer.photoSetDesc'),
      thumbnail: influencer.galleryImages[0],
      icon: <Camera className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.photos'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bcuts",
      name: t('influencer.bcuts'),
      description: t('influencer.bcutsDesc'),
      thumbnail: influencer.galleryImages[1],
      icon: <Image className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.bcuts'),
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "video",
      name: t('influencer.video'),
      description: t('influencer.videoDesc'),
      thumbnail: influencer.videoThumbnail,
      icon: <Play className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.video'),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vr",
      name: t('influencer.vrVideo'),
      description: t('influencer.vrVideoDesc'),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.vr'),
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "vrFull",
      name: t('influencer.vrFullVideo'),
      description: t('influencer.vrFullVideoDesc'),
      thumbnail: influencer.vrPreview,
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.vrFull'),
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "ai",
      name: t('influencer.aiPhotos'),
      description: t('influencer.aiPhotosDesc'),
      thumbnail: influencer.aiSamples[0],
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      badge: t('productBadges.ai'),
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Header - 모바일 최적화 */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")} 
            className="text-white hover:text-purple-400 p-2 md:px-4"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">{t('common.back')}</span>
          </Button>
          
          <button 
            onClick={() => router.push("/")}
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            {t('common.vrook')}
          </button>
          
          <div className="scale-75 md:scale-100 origin-right">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* 구매 불가 알림 배너 */}
      {!canPurchase && (
        <div className="bg-yellow-600/20 border-b border-yellow-600/30 px-3 md:px-4 py-2 md:py-3">
          <div className="container mx-auto text-center">
            <p className="text-yellow-200 text-xs md:text-sm">
              🚧 현재 구매가 일시 중단되었습니다. 곧 만나뵐 수 있도록 준비 중이에요!
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - 모바일 최적화 */}
      <section className="py-6 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* 모바일에서는 이미지가 먼저 표시 */}
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div className="w-72 md:w-96 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
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
                        // 다른 플랫폼들도 동일하게...
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
              패키지
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'products' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              개별 상품
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
                      className="w-full h-48 md:h-auto object-cover"
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
              {canPurchase ? t('influencer.purchaseFromXromeda') : '구매 준비 중'}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Selection - 모바일에서 조건부 표시 */}
      <section className={`py-8 md:py-16 px-4 ${activeTab !== 'products' ? 'hidden md:block' : ''}`}>
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
            {t('influencer.productGuide')}
          </h2>
          <p className="text-center text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base px-2">
            {t('influencer.productGuideDesc')}
          </p>

          {/* 상품 그리드 - 모바일 최적화 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 group ${
                  canPurchase ? "hover:scale-105 cursor-pointer" : "opacity-70 cursor-not-allowed"
                }`}
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg" style={{ aspectRatio: '16 / 9' }}>
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

                    {/* Category Icon */}
                    <div className={`absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r ${product.color} p-1.5 md:p-2 rounded-full`}>
                      {product.icon}
                    </div>

                    {/* Badge */}
                    <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-slate-900/80 text-white text-xs">
                      {product.badge}
                    </Badge>

                    {/* Play/View Icon Overlay */}
                    {canPurchase && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        {product.id === "video" || product.id === "vr" || product.id === "vrFull" ? (
                          <Play className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        ) : (
                          <Eye className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        )}
                      </div>
                    )}

                    {/* 구매 불가 오버레이 */}
                    {!canPurchase && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                        <div className="text-white text-center">
                          <div className="text-xl md:text-2xl mb-1 md:mb-2">🔒</div>
                          <div className="text-xs md:text-sm">준비 중</div>
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
            ))}
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