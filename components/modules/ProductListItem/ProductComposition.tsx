/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useLang } from '@/hooks/useLang'
import s from '@/styles/product-list-item/index.module.scss'

const ProductComposition = ({ composition }: { composition: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={s.product__composition}>
      {translations[lang].product.composition}: {/**@ts-ignore */}
      {translations[lang].catalog[composition]}
    </span>
  )
}

export default ProductComposition
