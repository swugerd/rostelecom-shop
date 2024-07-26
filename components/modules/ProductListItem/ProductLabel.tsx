import { useLang } from '@/hooks/useLang'
import s from '@/styles/product-list-item/index.module.scss'
import { IProductLabelProps } from '@/types/modules'

const ProductLabel = ({ isNew, isBestseller }: IProductLabelProps) => {
  const { lang, translations } = useLang()

  const bestsellerLabel = (
    <span
      className={`${s.list__item__item__label} ${s.list__item__bestseller}`}
    >
      {translations[lang].main_page.is_bestseller}
    </span>
  )

  const newLabel = (
    <span className={`${s.list__item__item__label} ${s.list__item__new}`}>
      {translations[lang].main_page.is_new}
    </span>
  )

  const allLabel = (
    <div className={s.list__item__label__all}>
      {newLabel}
      {bestsellerLabel}
    </div>
  )

  if (isNew && isBestseller) {
    return allLabel
  }

  if (isBestseller) {
    return bestsellerLabel
  }

  return newLabel
}

export default ProductLabel
