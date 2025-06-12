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
    dodaram: {
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
      thumbnail: influencer.galleryImages[0] || "/placeholder.svg",
      icon: <Camera className="w-6 h-6" />,
      badge: t('productBadges.photos'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bcuts",
      name: t('influencer.bcuts'),
      description: t('influencer.bcutsDesc'),
      thumbnail: influencer.galleryImages[1] || "/placeholder.svg",
      icon: <Image className="w-6 h-6" />,
      badge: t('productBadges.bcuts'),
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "video",
      name: t('influencer.video'),
      description: t('influencer.videoDesc'),
      thumbnail: influencer.videoThumbnail || "/placeholder.svg",
      icon: <Play className="w-6 h-6" />,
      badge: t('productBadges.video'),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vr",
      name: t('influencer.vrVideo'),
      description: t('influencer.vrVideoDesc'),
      thumbnail: influencer.vrPreview || "/placeholder.svg",
      icon: <Eye className="w-6 h-6" />,
      badge: t('productBadges.vr'),
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "vrFull",
      name: t('influencer.vrFullVideo'),
      description: t('influencer.vrFullVideoDesc'),
      thumbnail: influencer.vrPreview || "/placeholder.svg",
      icon: <Eye className="w-6 h-6" />,
      badge: t('productBadges.vrFull'),
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "ai",
      name: t('influencer.aiPhotos'),
      description: t('influencer.aiPhotosDesc'),
      thumbnail: influencer.aiSamples[0] || "/placeholder.svg",
      icon: <Sparkles className="w-6 h-6" />,
      badge: t('productBadges.ai'),
      color: "from-orange-500 to-red-500",
    },
  ]

  // 현재 언어에 맞는 인플루언서 정보 가져오기
  const getInfluencerDescription = () => {
    return locale === 'en' && influencer.descriptionEn ? influencer.descriptionEn : influencer.description
  }

  const getInfluencerBio = () => {
    return locale === 'en' && influencer.bioEn ? influencer.bioEn : influencer.bio
  }

  const getInfluencerCategory = () => {
    return influencer.categoryKey ? t(`categories.${influencer.categoryKey}`) : influencer.category
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
            <div className="relative">
              <img
                src={influencer.coverImage || "/placeholder.svg"}
                alt={influencer.name}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            </div>
            <div>
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-400 mb-4">
                {getInfluencerCategory()}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-4">{influencer.name}</h1>
              <p className="text-xl text-purple-200 mb-6">{getInfluencerDescription()}</p>
              <p className="text-slate-300 mb-6 leading-relaxed">{getInfluencerBio()}</p>
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
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
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
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {t('influencer.packageGuideDesc')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm ${
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
    </div>

    {/* Footer */}
    <footer className="bg-slate-900 py-12 px-4 border-t border-slate-700">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <button 
            onClick={() => router.push("/")}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer border-none bg-transparent"
          >
            {t('common.vrook')}
          </button>
          <p className="text-slate-400 mb-6">{t('home.footerDesc')}</p>
          
          {/* XROMEDA Company Info */}
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-500 text-sm mb-2">
              {locale === 'en' ? 'Powered by' : '제공'}
            </p>
            <a 
              href="https://xromeda.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-105 transform"
            >
              XROMEDA
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <p className="text-slate-500 text-sm mt-2">
              {locale === 'en' 
                ? 'Next-generation XR content platform' 
                : '차세대 XR 콘텐츠 플랫폼'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}