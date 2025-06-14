// components/OptimizedImage.tsx 업데이트
"use client"

import { useState, useEffect, useRef } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onLoad?: () => void
}

// 이미지 로드 캐시 (메모리 캐싱)
const imageCache = new Set<string>()
const loadingImages = new Map<string, Promise<void>>()

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onError,
  onLoad
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!imageCache.has(src))
  const [imgSrc, setImgSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // 이미지 프리로드 함수
  const preloadImage = (url: string): Promise<void> => {
    if (imageCache.has(url)) {
      return Promise.resolve()
    }

    if (loadingImages.has(url)) {
      return loadingImages.get(url)!
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        imageCache.add(url)
        loadingImages.delete(url)
        resolve()
      }
      img.onerror = () => {
        loadingImages.delete(url)
        reject()
      }
      img.src = url
    })

    loadingImages.set(url, promise)
    return promise
  }

  useEffect(() => {
    if (imageCache.has(src)) {
      setIsLoading(false)
      return
    }

    // 모든 이미지를 적극적으로 프리로드
    preloadImage(src)
      .then(() => setIsLoading(false))
      .catch(() => {
        setImgSrc('/placeholder.svg?height=400&width=400')
        setIsLoading(false)
      })
  }, [src])

  const handleLoad = () => {
    imageCache.add(imgSrc)
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false)
    if (!imgSrc.includes('placeholder.svg')) {
      setImgSrc('/placeholder.svg?height=400&width=400')
    }
    onError?.(e)
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-lg flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager" // 모든 이미지를 즉시 로딩으로 변경
        decoding="async"
        sizes={sizes}
        crossOrigin="anonymous"
      />
    </div>
  )
}