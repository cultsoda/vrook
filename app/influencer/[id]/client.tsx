"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Play, Eye, Sparkles, ExternalLink, Camera, Image } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"
import type { Influencer, Package } from "@/types/influencer"

interface InfluencerDetailClientProps {
  influencer: Influencer
  packages: Package[]
}

// client.tsx 파일 끝에 이 부분을 수정
export default function InfluencerDetailClient({ influencer, packages }: InfluencerDetailClientProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([])

  // 인플루언서별 상품 링크 매핑
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
      // 기본 링크 템플릿
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
    const link = getProductLink(influencer.id, productType)
    window.open(link, "_blank", "noopener,noreferrer")
  }

  const handlePackagePurchase = (packageId?: string) => {
    const link = getProductLink(influencer.id, 'photos')
    window.open(link, "_blank", "noopener,noreferrer")
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

  // 소셜 플랫폼 정보
  const getSocialPlatformInfo = (url: string) => {
    const platforms = [
      { pattern: 'instagram.com', name: 'Instagram', color: 'text-pink-400' },
      { pattern: 'youtube.com', name: 'YouTube', color: 'text-red-400' },
      { pattern: 'tiktok.com', name: 'TikTok', color: 'text-white' },
      { pattern: 'twitch.tv', name: 'Twitch', color: 'text-purple-400' },
      { pattern: 'twitter.com', name: 'X (Twitter)', color: 'text-blue-400' },
      { pattern: 'x.com', name: 'X (Twitter)', color: 'text-blue-400' },
      { pattern: 'patreon.com', name: 'Patreon', color: 'text-orange-400' },
      { pattern: 'chzzk.naver.com', name: 'CHZZK', color: 'text-green-400' },
      { pattern: 'sooplive.co.kr', name: 'Soop Live', color: 'text-blue-400' },
      { pattern: 'threads.com', name: 'Threads', color: 'text-black' },
    ]

    const platform = platforms.find(p => url.includes(p.pattern))
    return platform || { name: 'Link', color: 'text-gray-400' }
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

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <div className="w-96 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
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
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">{influencer.name}</h1>
              <p className="text-xl text-purple-200 mb-6">{t(influencer.descriptionKey)}</p>
              <p className="text-slate-300 mb-6 leading-relaxed">{t(influencer.bioKey)}</p>
              
              {/* SNS 링크 섹션 */}
              {influencer.socialLinks && influencer.socialLinks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">{t('common.socialLinks')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {influencer.socialLinks.map((link, index) => {
                      const platformInfo = getSocialPlatformInfo(link)
                      
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-white font-medium transition-all duration-200 backdrop-blur-sm border border-slate-600/30 hover:scale-105 ${platformInfo.color}`}
                          aria-label={`${influencer.name}의 ${platformInfo.name} 바로가기`}
                        >
                          <ExternalLink className="w-4 h-4" />
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

      {/* Package Guide */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('influencer.packageGuide')}</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {t('influencer.packageGuideDesc')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-0">
                  {/* 패키지 이미지 */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={`/images/products/${influencer.id}_${pkg.id}.webp`}
                      alt={`${influencer.name} ${t(`packages.${pkg.id}`)}`}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: '16/9' }}
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=450&width=800";
                      }}
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-white">{t(`packages.${pkg.id}`)}</CardTitle>
                    <div className="text-2xl font-bold text-purple-400">
                      ₩{pkg.price.krw.toLocaleString()} / ${pkg.price.usd}
                    </div>
                    <div className="text-sm text-slate-400">{t('packages.price')}</div>
                  </CardHeader>
                  
                  <div className="px-6 pb-6">
                    <ul className="space-y-2">
                      {pkg.features.map((featureKey, featureIndex) => {
                        const isNewFeature = pkg.newFeatures?.includes(featureKey)
                        return (
                          <li key={featureIndex} className="flex items-center text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 flex-shrink-0" />
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

          {/* CTA 버튼을 패키지 카드들 아래에 하나만 배치 */}
          <div className="text-center">
            <Button
              onClick={() => handlePackagePurchase()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-bold"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {t('influencer.purchaseFromXromeda')}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('influencer.productGuide')}</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {t('influencer.productGuideDesc')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer group"
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
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${product.color} p-2 rounded-full`}>
                      {product.icon}
                    </div>

                    {/* Badge */}
                    <Badge className="absolute top-3 right-3 bg-slate-900/80 text-white">
                      {product.badge}
                    </Badge>

                    {/* Play/View Icon Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                      {product.id === "video" || product.id === "vr" || product.id === "vrFull" ? (
                        <Play className="w-12 h-12 text-white" />
                      ) : (
                        <Eye className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-sm text-slate-300 line-clamp-2">{product.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-white font-semibold mb-6 text-center text-lg">{t('influencer.purchaseProcess')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: 1, icon: Eye, titleKey: 'step1', descKey: 'step1Desc', color: 'from-purple-500 to-pink-500' },
                { step: 2, icon: ExternalLink, titleKey: 'step2', descKey: 'step2Desc', color: 'from-blue-500 to-cyan-500' },
                { step: 3, icon: Users, titleKey: 'step3', descKey: 'step3Desc', color: 'from-green-500 to-emerald-500' },
              ].map((item, index) => (
                <div key={item.step} className="text-center relative">
                  <div className="relative mb-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2">{t(`influencer.${item.titleKey}`)}</h4>
                  <p className="text-sm text-slate-400">{t(`influencer.${item.descKey}`)}</p>

                  {/* Arrow to next step */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400">
                      <div className="absolute right-0 top-[-2px] w-0 h-0 border-l-4 border-l-blue-400 border-y-2 border-y-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
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
                  aria-label="VROOK 홈페이지로 이동"
                >
                  VROOK
                </button>
                <span className="text-slate-500">by</span>
                <a 
                  href="https://xromeda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-105 transform"
                  aria-label="XROMEDA 웹사이트 방문"
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