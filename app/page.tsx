"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { influencers } from "@/data/influencers"
import { Eye, Sparkles, Users, Camera, Headphones, ExternalLink } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"

// 로딩 스피너 컴포넌트
function LoadingSpinner({ size = 'md', className = '' }: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-purple-200 border-t-purple-600 ${sizeClasses[size]} ${className}`} />
  )
}

// 인플루언서 카드 스켈레톤
function InfluencerCardSkeleton() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-0">
        <Skeleton className="w-full aspect-square rounded-t-lg" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

// 이미지 로딩 컴포넌트
function LazyImage({ 
  src, 
  alt, 
  className = '', 
  onError = () => {},
  ...props
}: {
  src: string
  alt: string
  className?: string
  onError?: () => void
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    if (!imgSrc.includes('placeholder.svg')) {
      setImgSrc('/placeholder.svg?height=400&width=400')
    }
    setIsLoading(false)
    onError()
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-lg flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full object-cover`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t, locale } = useTranslation()

  // 페이지 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // 현재 언어에 맞는 인플루언서 정보 가져오기
  const getInfluencerHashtag = (influencer: any) => {
    return locale === 'en' && influencer.descriptionEn ? influencer.descriptionEn : influencer.description
  }

  const getInfluencerBio = (influencer: any) => {
    return locale === 'en' && influencer.bioEn ? influencer.bioEn : influencer.bio
  }

  const getInfluencerCategory = (influencer: any) => {
    return influencer.categoryKey ? t(`categories.${influencer.categoryKey}`) : influencer.category
  }

  // 로딩 상태일 때 보여줄 스켈레톤 UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="relative container mx-auto px-4 py-16">
            <div className="absolute top-4 right-4">
              <Skeleton className="h-8 w-24" />
            </div>
            
            <div className="text-center">
              <div className="mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  VROOK
                </div>
                <Skeleton className="h-6 w-96 mx-auto mb-2" />
                <Skeleton className="h-4 w-80 mx-auto" />
              </div>
              <div className="flex justify-center space-x-4">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* VROOK 소개 섹션 스켈레톤 */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Skeleton className="h-10 w-64 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-12 h-12 mx-auto mb-4" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 인플루언서 섹션 스켈레톤 */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[...Array(9)].map((_, i) => (
                <InfluencerCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-16">
          {/* Language Switcher */}
          <div className="absolute top-4 right-4">
            <LanguageSwitcher />
          </div>
          
          <div className="text-center">
            <div className="mb-8">
              <button 
                onClick={() => window.location.reload()}
                className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer border-none bg-transparent"
              >
                {t('common.vrook')}
              </button>
              <p className="text-xl text-purple-200 mb-2">{t('home.subtitle')}</p>
              <p className="text-lg text-slate-300">{t('home.description')}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-200 border-purple-400">
                <Eye className="w-4 h-4 mr-2" />
                {t('home.vrExperience')}
              </Badge>
              <Badge variant="secondary" className="bg-pink-600/20 text-pink-200 border-pink-400">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('home.aiPhotos')}
              </Badge>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 border-blue-400">
                <Users className="w-4 h-4 mr-2" />
                {t('home.celebContent')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* VROOK 소개 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">{t('home.serviceComponents')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Headphones className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t('home.vrVideos')}</h3>
                <p className="text-slate-300">{t('home.vrVideosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t('home.digitalPhotos')}</h3>
                <p className="text-slate-300">{t('home.digitalPhotosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t('home.specialVideos')}</h3>
                <p className="text-slate-300">{t('home.specialVideosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t('home.aiPhotos')}</h3>
                <p className="text-slate-300">{t('home.aiPhotosDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 인플루언서 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">{t('home.influencers')}</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {t('home.influencersDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {influencers.map((influencer) => (
              <Link key={influencer.id} href={`/influencer/${influencer.id}`}>
                <Card
                  className="bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-slate-800/70 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(influencer.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg aspect-square">
                      <LazyImage
                        src={influencer.profileImage}
                        alt={influencer.name}
                        className="w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{influencer.name}</h3>
                        {/* 해시태그 표시 */}
                        <p className="text-sm text-purple-300 mb-1 font-medium">{getInfluencerHashtag(influencer)}</p>
                        {/* 짧은 소개 표시 (첫 번째 문장만) */}
                        <p className="text-xs text-slate-300 line-clamp-2">{getInfluencerBio(influencer).split('.')[0]}.</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        {getInfluencerCategory(influencer)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-700">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.location.reload()}
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
      </footer>
    </div>
  )
}