// components/OptimizedImage.tsx - 새로 생성
"use client"

import { useState } from 'react'
import { LoadingSpinner } from '@/components/LoadingComponents'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // WebP 지원 여부에 따른 이미지 src 생성
  const getOptimizedSrc = (originalSrc: string) => {
    // .webp로 끝나지 않는 경우 .webp 버전 시도
    if (!originalSrc.includes('.webp') && !originalSrc.includes('placeholder')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)/, '.webp')
    }
    return originalSrc
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-lg flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      <img
        src={hasError ? "/placeholder.svg?height=400&width=400" : getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
      />
    </div>
  )
}