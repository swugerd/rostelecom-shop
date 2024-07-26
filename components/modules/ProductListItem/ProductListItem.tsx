/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import { setCurrentProduct } from '@/context/goods'
import { showQuickViewModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { addOverflowHiddenToBody, formatPrice } from '@/lib/utils/common'
import sAd from '@/styles/ad/index.module.scss'
import s from '@/styles/product-list-item/index.module.scss'
import { IProductsListItemProps } from '@/types/modules'
import Image from 'next/image'
import Link from 'next/link'
import ProductLabel from './ProductLabel'

const ProductListItem = ({ item, title }: IProductsListItemProps) => {
  const { lang, translations } = useLang()
  const isMedia800 = useMediaQuery(800)
  const isTitleForNew = title === translations[lang].main_page.new_title

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  return (
    <>
      {item.characteristics.collection === 'line' &&
      item.type === 't-shirts' ? (
        <li className={s.list__item_ad}>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={s.list__item_ad__inner}
          >
            <span className={`${sAd.ad} ${s.list__item_ad__ad}`}>
              {translations[lang].common.ad}
            </span>
            <ProductSubtitle
              subtitleClassName={s.list__item_ad__subtitle}
              subtitleRectClassName={s.list__item_ad__subtitle__rect}
            />
            <div className={s.list__item_ad__img}>
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                objectFit='contain'
              />
            </div>
            <p className={s.list__item_ad__title}>
              <span>
                {translations[lang].main_page.tShirt} &quot Line &quot{' '}
                {
                  //@ts-ignore
                  translations[lang].main_page[
                    item.images[0].split('/img/').join('').split('-')[0]
                  ]
                }
              </span>
              <span>{formatPrice(+item.price)} &#8381;</span>
            </p>
          </Link>
        </li>
      ) : (
        <li className={s.list__item}>
          {title ? (
            <span
              className={`${s.list__item__label} ${isTitleForNew ? s.list__item__new : s.list__item__bestseller}`}
            >
              {isTitleForNew
                ? translations[lang].main_page.is_new
                : translations[lang].main_page.is_bestseller}
            </span>
          ) : !item.isNew && !item.isBestseller ? (
            ''
          ) : (
            <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
          )}
          <div className={s.list__item__actions}>
            <ProductItemActionBtn
              text={translations[lang].product.add_to_favorites}
              iconClass='actions__btn_favorite'
            />
            <ProductItemActionBtn
              text={translations[lang].product.add_to_comparison}
              iconClass='actions__btn_comparison'
            />
            {!isMedia800 && (
              <ProductItemActionBtn
                text={translations[lang].product.quick_view}
                iconClass='actions__btn_quick_view'
                callback={handleShowQuickViewModal}
              />
            )}
          </div>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={s.list__item__img}
          >
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              objectFit='contain'
            />
          </Link>
          <div className={s.list__item__innder}>
            <h3 className={s.list__item__title}>
              <Link href={`/catalog/${item.category}/${item._id}`}>
                {item.name}
              </Link>
            </h3>
            <ProductAvailable
              vendorCode={item.vendorCode}
              inStock={+item.inStock}
            />
            <span>{formatPrice(+item.price)} &#8381;</span>
          </div>
          <button className={`btn-reset ${s.list__item__cart}`}>
            {translations[lang].product.to_cart}
          </button>
        </li>
      )}
    </>
  )
}

export default ProductListItem
