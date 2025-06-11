"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { influencers, packages } from "@/data/influencers"
import { ArrowLeft, Users, Play, Eye, Sparkles, ExternalLink, ShoppingCart, Camera } from "lucide-react"

export default function InfluencerDetailPage() {
  const params = useParams()
  const router = useRouter()

  // 각 상품의 구매 상태를 관리 (실제로는 서버에서 가져와야 함)
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([])

  const influencer = influencers.find((inf) => inf.id === params.id)

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">인플루언서를 찾을 수 없습니다</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  const handleProductClick = (productType: string) => {
    // XROMEDA 링크로 이동
    window.open("https://xromeda.com/play/2d/wg7ppwtgi548iba2", "_blank")
  }

  const products = [
    {
      id: "photos",
      name: "화보 사진",
      description: "고품질 프로페셔널 화보 사진 20장",
      thumbnail: influencer.galleryImages[0] || "/placeholder.svg",
      icon: <Camera className="w-6 h-6" />,
      badge: "20장",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "video",
      name: "화보 영상",
      description: "프리미엄 화보 촬영 과정과 비하인드 스토리",
      thumbnail: influencer.videoThumbnail || "/placeholder.svg",
      icon: <Play className="w-6 h-6" />,
      badge: "HD 영상",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "vr",
      name: "VR 영상",
      description: "몰입감 있는 VR 기술로 제작된 독점 영상",
      thumbnail: influencer.vrPreview || "/placeholder.svg",
      icon: <Eye className="w-6 h-6" />,
      badge: "VR 체험",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "ai",
      name: "AI 화보",
      description: "AI 기술로 생성된 창의적이고 독특한 합성 화보",
      thumbnail: influencer.aiSamples[0] || "/placeholder.svg",
      icon: <Sparkles className="w-6 h-6" />,
      badge: "3장",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:text-purple-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            VROOK
          </h1>
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
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-400 mb-4">{influencer.category}</Badge>
              <h1 className="text-5xl font-bold text-white mb-4">{influencer.name}</h1>
              <p className="text-xl text-purple-200 mb-6">{influencer.description}</p>
              <p className="text-slate-300 mb-6 leading-relaxed">{influencer.bio}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-slate-300">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="font-semibold">{influencer.followers} 팔로워</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">상품 선택</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            {influencer.name}의 다양한 콘텐츠를 개별적으로 선택하여 구매할 수 있습니다
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        {product.id === "video" || product.id === "vr" ? (
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
                            상품 보러가기
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            XROMEDA에서 구매하기
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">패키지 안내</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            다양한 패키지로 더욱 알찬 콘텐츠를 만나보세요. 개별 구매보다 패키지로 구매하시면 더 많은 혜택을 받을 수
            있습니다.
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
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">추천</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white">{pkg.name}</CardTitle>
                  <div className="text-2xl font-bold text-purple-400">{pkg.price.toLocaleString()}원</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-slate-800/30 rounded-lg border border-slate-600">
            <h3 className="text-white font-semibold mb-3 text-center">💡 패키지 혜택</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="text-center">
                <div className="text-purple-400 font-semibold">할인 혜택</div>
                <div>개별 구매 대비 최대 30% 할인</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-semibold">추가 혜택</div>
                <div>VR HMD 증정 및 배송비 무료</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-semibold">특별 혜택</div>
                <div>팬미팅 참여 기회 제공</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="mt-6 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-white font-semibold mb-6 text-center text-lg">구매 프로세스</h3>
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
                  <h4 className="text-white font-medium mb-2">상품 선택</h4>
                  <p className="text-sm text-slate-400">원하는 상품을 선택하고 구매 버튼을 클릭합니다</p>

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
                  <h4 className="text-white font-medium mb-2">XROMEDA 이동</h4>
                  <p className="text-sm text-slate-400">XROMEDA 플랫폼으로 자동 이동됩니다</p>

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
                  <h4 className="text-white font-medium mb-2">결제 완료</h4>
                  <p className="text-sm text-slate-400">결제 정보를 입력하고 구매를 완료합니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
