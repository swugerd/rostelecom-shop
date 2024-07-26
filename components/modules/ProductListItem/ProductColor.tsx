/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useLang } from '@/hooks/useLang'
import s from '@/styles/product/index.module.scss'

const ProductColor = ({ color }: { color: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={s.product__color}>
      {/**@ts-ignore */}
      {translations[lang].catalog.color}: {translations[lang].catalog[color]}
    </span>
  )
}

export default ProductColor
