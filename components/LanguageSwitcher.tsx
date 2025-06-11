"use client"

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, locales, asPath } = router

  const languages = {
    ko: { name: '한국어', flag: '🇰🇷' },
    en: { name: 'English', flag: '🇺🇸' },
  }

  const changeLanguage = (newLocale: string) => {
    router.push(asPath, asPath, { locale: newLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:text-purple-400">
          <Globe className="w-4 h-4 mr-2" />
          {languages[locale as keyof typeof languages]?.flag} {languages[locale as keyof typeof languages]?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        {locales?.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => changeLanguage(loc)}
            className={`cursor-pointer hover:bg-slate-700 ${
              locale === loc ? 'bg-slate-700' : ''
            }`}
          >
            <span className="mr-2">{languages[loc as keyof typeof languages]?.flag}</span>
            {languages[loc as keyof typeof languages]?.name}
            {locale === loc && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}