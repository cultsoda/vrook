import { influencers, getInfluencerPackages } from "@/data/influencers"
import { generateInfluencerMetadata, generateStructuredData } from "@/lib/seo"
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const InfluencerDetailClient = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-200 border-t-purple-600" />
    </div>
  )
})

// 동적 메타데이터 생성 함수 (서버 컴포넌트)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const influencer = influencers.find((inf) => inf.id === params.id)
  
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

// 정적 경로 생성 (서버 컴포넌트)
export async function generateStaticParams() {
  return influencers.map((influencer) => ({
    id: influencer.id,
  }))
}

// 서버 컴포넌트 (메타데이터와 구조화된 데이터 처리)
export default function InfluencerDetailPage({ params }: { params: { id: string } }) {
  const influencer = influencers.find((inf) => inf.id === params.id)

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

  // 구조화된 데이터 생성
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