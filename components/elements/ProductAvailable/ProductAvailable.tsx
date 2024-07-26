import { useLang } from '@/hooks/useLang'
import s from '@/styles/product-list-item/index.module.scss'
import { IProductAvailableProps } from '@/types/elements'

const ProductAvailable = ({ vendorCode, inStock }: IProductAvailableProps) => {
  const isInStock = +inStock > 0
  const { lang, translations } = useLang()

  return (
    <div className={s.product}>
      <span
        className={`${s.product__stock} ${isInStock ? s.product__stock__green : s.product__stock__red}`}
      >
        {isInStock
          ? translations[lang].product.available
          : translations[lang].product.not_available}
      </span>
      <span className={s.product__code}>
        {translations[lang].product.vendor_code} .: {vendorCode}
      </span>
    </div>
  )
}

export default ProductAvailable
