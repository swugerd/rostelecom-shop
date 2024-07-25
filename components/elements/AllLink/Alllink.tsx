'use client'
import { useLang } from '@/hooks/useLang'
import s from '@/styles/main-page/index.module.scss'
import Link from 'next/link'

const Alllink = () => {
  const { lang, translations } = useLang()

  return (
    <Link href='/catalog' className={s.all}>
      <span />
      {translations[lang].common.all_link}
    </Link>
  )
}

export default Alllink
