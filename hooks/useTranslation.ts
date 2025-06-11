import { useRouter } from 'next/router'
import ko from '../locales/ko.json'
import en from '../locales/en.json'

type TranslationKey = keyof typeof ko

const translations = {
  ko,
  en,
}

export function useTranslation() {
  const router = useRouter()
  const { locale = 'ko' } = router

  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: any = translations[locale as keyof typeof translations]
    
    for (const k of keys) {
      translation = translation?.[k]
    }
    
    return translation || key
  }

  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale })
  }

  return {
    t,
    locale,
    changeLanguage,
  }
}