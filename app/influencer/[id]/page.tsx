import { influencers, getInfluencerPackages } from "@/data/influencers"
import { generateInfluencerMetadata, generateStructuredData } from "@/lib/seo"
import type { Metadata } from 'next'
import InfluencerDetailClient from './client'

// ✅ 수정 1: 타입 정의 변경
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params  // ✅ 수정 2: await 추가
  const influencer = influencers.find((inf) => inf.id === id)  // params.id → id
  
  if (!influencer) {
    return {
      title: 'VROOK - 인플루언서를 찾을 수 없습니다',
      description: 'VROOK VR 셀럽 화보 플랫폼',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return generateInfluencerMetadata(influencer)
}

// 정적 경로 생성 (변경 없음)
export async function generateStaticParams() {
  return influencers.map((influencer) => ({
    id: influencer.id,
  }))
}

// ✅ 수정 3: 메인 함수도 동일하게 수정
export default async function InfluencerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params  // ✅ await 추가
  const influencer = influencers.find((inf) => inf.id === id)  // params.id → id

  if (!influencer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">인플루언서를 찾을 수 없습니다</h1>
          <a href="/" className="text-purple-400 hover:text-purple-300">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  // 구조화된 데이터 생성 (변경 없음)
  const structuredData = generateStructuredData(influencer)
  const packages = getInfluencerPackages(influencer.id)

  return (
    <>
      {/* 구조화된 데이터 추가 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* 중요한 리소스 preload */}
      <link rel="preload" href={influencer.coverImage} as="image" />

      {/* 클라이언트 컴포넌트로 전달 */}
      <InfluencerDetailClient 
        influencer={influencer} 
        packages={packages}
      />
    </>
  )
}