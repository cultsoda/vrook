// app/loading.tsx 파일 생성
export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-200 border-t-purple-600 mb-4 mx-auto" />
        <p className="text-white text-lg">로딩 중...</p>
      </div>
    </div>
  )
}