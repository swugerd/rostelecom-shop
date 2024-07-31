import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import { closeQuickViewModal } from '@/context/modals'
import { useCartAction } from '@/hooks/useCartAction'
import { useLang } from '@/hooks/useLang'
import { useProductImages } from '@/hooks/useProductImages'
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import productS from '@/styles/product-list-item/index.module.scss'
import s from '@/styles/quick-view-modal/index.module.scss'
import Link from 'next/link'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import ProductColor from '../ProductListItem/ProductColor'
import ProductComposition from '../ProductListItem/ProductComposition'
import ProductCounter from '../ProductListItem/ProductCounter'
import ProductSizesItem from '../ProductListItem/ProductSizesItem'
import ProductSizeTableBtn from '../ProductListItem/ProductSizeTableBtn'
import QuickViewModalSlider from './QuickViewModalSlider'

const QuickViewModal = () => {
  const { translations, lang } = useLang()
  const {
    selectedSize,
    setSelectedSize,
    product,
    count,
    handleAddToCart,
    addToCartSpinner,
    updateCountSpinner,
    allCurrentCartItemCount,
  } = useCartAction()
  const images = useProductImages(product)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const addToCart = () => handleAddToCart(count)

  return (
    <div className={s.modal}>
      <button
        className={`btn-reset ${s.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={s.modal__actions}>
        <ProductItemActionBtn
          text={translations[lang].product.add_to_favorites}
          iconClass='actions__btn_favorite'
          withTooltip={false}
        />
        <ProductItemActionBtn
          text={translations[lang].product.add_to_comparison}
          iconClass='actions__btn_comparison'
          withTooltip={false}
        />
      </div>
      <div className={s.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={s.modal__right}>
        <h3 className={s.modal__right__title}>{product.name}</h3>
        <div className={s.modal__right__price}>
          {formatPrice(+product.price)} &#8381;
        </div>
        <div className={s.modal__right__info}>
          <ProductAvailable
            vendorCode={product.vendorCode}
            inStock={+product.inStock}
          />
          <ProductColor color={product.characteristics.color} />
          {product.characteristics?.composition && (
            <ProductComposition
              composition={product.characteristics.composition}
            />
          )}
          {Object.keys(product.sizes).length ? (
            <div className={s.modal__right__info__size}>
              <div className={s.modal__right__info__size__inner}>
                <span className={productS.product__size_title}>
                  {translations[lang].catalog.size}
                </span>
                <ProductSizeTableBtn
                  sizes={product.sizes}
                  type={product.type}
                  classname={`sizes-table-btn ${s.modal__right__info__sizes_btn}`}
                />
              </div>
              <ul className={`list-reset ${s.modal__right__info__sizes}`}>
                {Object.entries(product.sizes).map(([key, value], i) => (
                  <ProductSizesItem
                    key={i}
                    currentSize={[key, value]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    currentCartItems={[]}
                  />
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
          <div className={s.modal__right__bottom}>
            <span className={productS.product__count_title}>
              {translations[lang].product.count}
            </span>
            <div className={s.modal__right__bottom__inner}>
              {!!selectedSize ? (
                <ProductCounter
                  className={`counter ${s.modal__right__bottom__counter}`}
                  count={0}
                />
              ) : (
                <div
                  className={`counter ${s.modal__right__bottom__counter}`}
                  style={{ justifyContent: 'center' }}
                >
                  <span>{translations[lang].product.total_in_cart} 0</span>
                </div>
              )}
              <AddToCartBtn
                className={s.modal__right__bottom__add}
                text={translations[lang].product.to_cart}
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product.inStock
                }
              />
            </div>
          </div>
        </div>
        <div className={s.modal__right__more}>
          <Link
            href={`/catalog/${product.category}/${product._id}`}
            className={s.modal__right__more__link}
            onClick={handleCloseModal}
          >
            {translations[lang].product.more}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
