"use client"

import { useState, useEffect } from 'react'
import ko from '../locales/ko.json'
import en from '../locales/en.json'

const translations = {
  ko,
  en,
}

export function useTranslation() {
  const [locale, setLocale] = useState<'ko' | 'en'>('ko')

  // 브라우저 저장소에서 언어 설정 로드
  useEffect(() => {
    const savedLocale = localStorage.getItem('vrook-locale') as 'ko' | 'en'
    if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
      setLocale(savedLocale)
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: any = translations[locale]
    
    for (const k of keys) {
      translation = translation?.[k]
    }
    
    return translation || key
  }

  const changeLanguage = (newLocale: 'ko' | 'en') => {
    setLocale(newLocale)
    localStorage.setItem('vrook-locale', newLocale)
  }

  return {
    t,
    locale,
    changeLanguage,
  }
}