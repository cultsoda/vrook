"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { influencers } from "@/data/influencers"
import { Eye, Sparkles, Users, Camera, Headphones } from "lucide-react"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              VROOK
            </h1>
            <p className="text-xl text-purple-200 mb-2">VR 셀럽 화보 - 혁신적 콘텐츠가 초가된 상품입니다</p>
            <p className="text-lg text-slate-300">VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달합니다</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-200 border-purple-400">
              <Eye className="w-4 h-4 mr-2" />
              VR 체험
            </Badge>
            <Badge variant="secondary" className="bg-pink-600/20 text-pink-200 border-pink-400">
              <Sparkles className="w-4 h-4 mr-2" />
              AI 화보
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 border-blue-400">
              <Users className="w-4 h-4 mr-2" />
              셀럽 콘텐츠
            </Badge>
          </div>
        </div>
      </header>

      {/* VROOK 소개 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">VROOK 서비스 구성</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">디지털 화보</h3>
                <p className="text-slate-300">고품질 2D 사진과 영상으로 구성된 프리미엄 화보 콘텐츠</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Headphones className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">VR 영상</h3>
                <p className="text-slate-300">몰입감 있는 VR 기술로 제작된 독점 영상 콘텐츠</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI 화보</h3>
                <p className="text-slate-300">AI 기술로 생성된 창의적이고 독특한 합성 화보</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 인플루언서 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">인플루언서</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            9명의 다양한 분야 인플루언서들의 독점 VR 콘텐츠를 만나보세요
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
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={influencer.profileImage || "/placeholder.svg"}
                        alt={influencer.name}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{influencer.name}</h3>
                        <p className="text-sm text-slate-300">{influencer.description}</p>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-purple-600/80 text-white">
                        {influencer.followers}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        {influencer.category}
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
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            VROOK
          </h3>
          <p className="text-slate-400">VR 셀럽 화보 플랫폼 - 새로운 디지털 경험의 시작</p>
        </div>
      </footer>
    </div>
  )
}