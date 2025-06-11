"use client"

import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useTranslation()

  const languages = {
    ko: { name: '한국어', flag: '🇰🇷' },
    en: { name: 'English', flag: '🇺🇸' },
  }

  const toggleLanguage = () => {
    const newLocale = locale === 'ko' ? 'en' : 'ko'
    changeLanguage(newLocale)
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-white hover:text-purple-400"
      onClick={toggleLanguage}
    >
      <Globe className="w-4 h-4 mr-2" />
      {languages[locale]?.flag} {languages[locale]?.name}
    </Button>
  )
}