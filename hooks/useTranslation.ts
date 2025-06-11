"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import ko from '../locales/ko.json'
import en from '../locales/en.json'

const translations = {
  ko,
  en,
}

interface TranslationContextType {
  t: (key: string) => string
  locale: 'ko' | 'en'
  changeLanguage: (locale: 'ko' | 'en') => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
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
    let translation: any = translations[locale]
    
    for (const k of keys) {
      translation = translation?.[k]
    }
    
    console.log(`Translating "${key}" (${locale}):`, translation)
    return translation || key
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

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}