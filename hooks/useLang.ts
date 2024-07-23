'use client'

import { $lang } from '@/context/lang'
import translationsJson from '@/public/translations/translations.json'
import { useUnit } from 'effector-react'

export const useLang = () => {
  const lang = useUnit($lang)
  const translations = translationsJson

  return { lang, translations }
}
