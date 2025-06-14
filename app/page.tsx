"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { influencers } from "@/data/influencers"
import { Eye, Sparkles, Users, Camera, Headphones, ExternalLink } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"
import { OptimizedImage } from "@/components/OptimizedImage"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { t, locale } = useTranslation()

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Header - 모바일 최적화 */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-8 md:py-16">
          {/* Language Switcher - 모바일에서 위치 조정 */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4">
            <LanguageSwitcher />
          </div>
          
          <div className="text-center pt-8 md:pt-0">
            <div className="mb-6 md:mb-8">
              <button 
                onClick={() => window.location.reload()}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 md:mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer border-none bg-transparent"
              >
                {t('common.vrook')}
              </button>
              <p className="text-lg md:text-xl text-purple-200 mb-2 px-2">{t('home.subtitle')}</p>
              <p className="text-base md:text-lg text-slate-300 px-4">{t('home.description')}</p>
            </div>
            {/* Badge들 - 호버 효과 완전 제거 */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <Badge className="bg-purple-600/20 text-purple-200 border border-purple-400 px-4 py-2 w-auto cursor-default pointer-events-none">
                <Eye className="w-4 h-4 mr-2" />
                {t('home.vrVideos')}
              </Badge>
              <Badge className="bg-pink-600/20 text-pink-200 border border-pink-400 px-4 py-2 w-auto cursor-default pointer-events-none">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('home.aiPhotos')}
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-200 border border-blue-400 px-4 py-2 w-auto cursor-default pointer-events-none">
                <Users className="w-4 h-4 mr-2" />
                {t('home.celebContent')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* VROOK 소개 섹션 - 모바일 최적화 */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12">
            {t('home.serviceComponents')}
          </h2>
          {/* 모바일에서는 1열, 태블릿 2열, 데스크톱 4열 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Headphones className="w-10 h-10 md:w-12 md:h-12 text-pink-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t('home.vrVideos')}</h3>
                <p className="text-sm md:text-base text-slate-300">{t('home.vrVideosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Camera className="w-10 h-10 md:w-12 md:h-12 text-purple-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t('home.digitalPhotos')}</h3>
                <p className="text-sm md:text-base text-slate-300">{t('home.digitalPhotosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Eye className="w-10 h-10 md:w-12 md:h-12 text-blue-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t('home.specialVideos')}</h3>
                <p className="text-sm md:text-base text-slate-300">{t('home.specialVideosDesc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t('home.aiPhotos')}</h3>
                <p className="text-sm md:text-base text-slate-300">{t('home.aiPhotosDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 인플루언서 섹션 - 모바일 최적화 및 검정 영역 제거 */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-3 md:mb-4">
            {t('home.influencers')}
          </h2>
          <p className="text-center text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base px-4">
            {t('home.influencersDesc')}
          </p>
          {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {influencers.map((influencer, index) => (
              <Link key={influencer.id} href={`/influencer/${influencer.id}`}>
                <Card
                  className="bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-slate-800/70 cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredCard(influencer.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    {/* 이미지만 표시 - 모든 텍스트는 이미지 위 오버레이로 */}
                    <div className="relative overflow-hidden aspect-[4/5] md:aspect-square">
                      <OptimizedImage
                        src={influencer.profileImage}
                        alt={influencer.name}
                        priority={true}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* 강화된 그라데이션 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      {/* 텍스트 오버레이 - PC와 모바일 동일하게 이미지 위에만 표시 */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {influencer.name}
                        </h3>
                        <p className="text-sm md:text-base text-purple-300 font-semibold">
                          {t(influencer.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - 모바일 최적화 */}
      <footer className="bg-slate-900 py-6 md:py-8 px-4 border-t border-slate-700">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button 
                onClick={() => window.location.reload()}
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
      </footer>
    </div>
  )
}