"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// JSON 파일에서 번역 데이터 import
import translationsData from '@/locales/translations.json'

interface TranslationContextType {
  t: (key: string) => string
  locale: 'ko' | 'en'
  changeLanguage: (locale: 'ko' | 'en') => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [locale, setLocale] = useState<'ko' | 'en'>('ko')

  // 초기 언어 설정 로드
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('vrook-locale') as 'ko' | 'en'
      console.log('Loading saved locale:', savedLocale)
      if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
        setLocale(savedLocale)
      }
    } catch (error) {
      console.error('localStorage error:', error)
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: any = translationsData
    
    // 중첩된 키를 따라가며 번역 객체 찾기
    for (const k of keys) {
      translation = translation?.[k]
    }
    
    // 번역 객체가 있고 현재 언어 키가 있으면 해당 언어의 번역 반환
    if (translation && typeof translation === 'object' && translation[locale]) {
      console.log(`Translating "${key}" (${locale}):`, translation[locale])
      return translation[locale]
    }
    
    // 번역이 없으면 키 자체를 반환
    console.warn(`Translation not found for "${key}" (${locale})`)
    return key
  }

  const changeLanguage = (newLocale: 'ko' | 'en') => {
    console.log('Changing language from', locale, 'to', newLocale)
    setLocale(newLocale)
    
    try {
      localStorage.setItem('vrook-locale', newLocale)
      console.log('Language saved to localStorage:', newLocale)
    } catch (error) {
      console.error('localStorage save error:', error)
    }
  }

  return React.createElement(
    TranslationContext.Provider,
    { value: { t, locale, changeLanguage } },
    children
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}