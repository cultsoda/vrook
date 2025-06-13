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
                  <div className="flex flex-wrap gap-3">
                    {influencer.socialLinks.map((link, index) => {
                      const getPlatformInfo = (url: string) => {
                        if (url.includes('instagram.com')) return { 
                          name: 'Instagram', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          ),
                          color: 'text-pink-400 hover:text-pink-300'
                        }
                        if (url.includes('youtube.com') || url.includes('youtu.be')) return { 
                          name: 'YouTube', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          ),
                          color: 'text-red-400 hover:text-red-300'
                        }
                        if (url.includes('tiktok.com')) return { 
                          name: 'TikTok', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                          ),
                          color: 'text-white hover:text-gray-200'
                        }
                        if (url.includes('twitch.tv')) return { 
                          name: 'Twitch', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                            </svg>
                          ),
                          color: 'text-purple-400 hover:text-purple-300'
                        }
                        if (url.includes('twitter.com') || url.includes('x.com')) return { 
                          name: 'X (Twitter)', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          ),
                          color: 'text-blue-400 hover:text-blue-300'
                        }
                        if (url.includes('chzzk.naver.com')) return { 
                          name: 'CHZZK', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          ),
                          color: 'text-green-400 hover:text-green-300'
                        }
                        if (url.includes('sooplive.co.kr')) return { 
                          name: 'Soop Live', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                            </svg>
                          ),
                          color: 'text-blue-400 hover:text-blue-300'
                        }
                        return { 
                          name: 'Link', 
                          icon: (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/60 hover:bg-slate-700/60 transition-all duration-200 backdrop-blur-sm border border-slate-600/30 hover:scale-110 ${platformInfo.color}`}
                          aria-label={`${influencer.name}의 ${platformInfo.name} 바로가기`}
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