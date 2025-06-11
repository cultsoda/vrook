"use client"

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, ChevronDown } from 'lucide-react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  
  // 현재 언어 감지 (URL에서 추출)
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ko'

  const languages = {
    ko: { name: '한국어', flag: '🇰🇷' },
    en: { name: 'English', flag: '🇺🇸' },
  }

  const changeLanguage = (newLocale: string) => {
    if (newLocale === 'ko') {
      // 한국어는 기본 경로
      if (pathname.startsWith('/en')) {
        router.push(pathname.replace('/en', '') || '/')
      }
    } else {
      // 영어는 /en 접두사 추가
      if (!pathname.startsWith('/en')) {
        router.push(`/en${pathname}`)
      }
    }
  }

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:text-purple-400"
        onClick={() => changeLanguage(currentLocale === 'ko' ? 'en' : 'ko')}
      >
        <Globe className="w-4 h-4 mr-2" />
        {languages[currentLocale as keyof typeof languages]?.flag} {languages[currentLocale as keyof typeof languages]?.name}
        <ChevronDown className="w-3 h-3 ml-1" />
      </Button>
    </div>
  )
}