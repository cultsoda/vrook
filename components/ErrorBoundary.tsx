"use client"

import React, { Component, ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-900 border-slate-700 text-white">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-500/20 rounded-full w-fit">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-xl font-bold text-red-400">
                앗! 문제가 발생했어요
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-center">
                페이지를 불러오는 중에 오류가 발생했습니다.
                잠시 후 다시 시도해주세요.
              </p>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={this.handleRetry} 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-slate-300 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Home className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// 이미지 에러 처리 커스텀 훅
export function useImageError() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    if (!target.src.includes('placeholder.svg')) {
      target.src = '/placeholder.svg?height=400&width=400'
      console.warn('Image failed to load:', target.src)
    }
  }

  return { handleImageError }
}