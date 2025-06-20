'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// 간단하고 안전한 Props 타입 정의
interface ThemeProviderProps {
  children: React.ReactNode
  [key: string]: any // 모든 속성 허용
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props as any}>{children}</NextThemesProvider>
}
