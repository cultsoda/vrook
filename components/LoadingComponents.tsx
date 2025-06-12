"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// 인플루언서 카드 스켈레톤
export function InfluencerCardSkeleton() {
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

// 로딩 스피너
export function LoadingSpinner({ size = 'md', className = '' }: { 
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

// 이미지 로딩 래퍼
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/placeholder.svg?height=400&width=400' 
}: {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

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
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
      />
    </div>
  )
}