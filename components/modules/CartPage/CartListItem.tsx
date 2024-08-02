import { useCartItemAction } from '@/hooks/useCarrtItemAction'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/lib/utils/common'
import s from '@/styles/cart-page/index.module.scss'
import { ICartItem } from '@/types/cart'
import Image from 'next/image'
import ProductCounter from '../ProductListItem/ProductCounter'

const CartListItem = ({ item }: { item: ICartItem }) => {
  const {
    deleteSpinner,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    animatedPrice,
    count,
    setCount,
    handleDeleteCartItem,
  } = useCartItemAction(item)

  const isMedia530 = useMediaQuery(530)
  const imageSize = isMedia530 ? 132 : 160

  return (
    <>
      <button
        disabled={deleteSpinner}
        className={`btn-reset ${s.cart__list__item__delete}`}
        onClick={handleDeleteCartItem}
      >
        <span />
      </button>
      <div
        className={`${s.cart__list__item__img} ${s.cart__list__item__block}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <div className={s.cart__list__item__wrapper}>
        <div
          className={`${s.cart__list__item__name} ${s.cart__list__item__block}`}
        >
          {item.name}
        </div>
        <div
          className={`${s.cart__list__item__size} ${s.cart__list__item__block}`}
        >
          Размер: {item.size.toUpperCase()}
        </div>
      </div>
      <div className={s.cart__list__item__inner}>
        <div
          className={`${s.cart__list__item__initial} ${s.cart__list__item__inner__block}`}
        >
          <span
            className={`${s.cart__list__item__price} ${s.cart__list__item__initial__price}`}
          >
            {formatPrice(+item.price)} &#8381;
          </span>
          <span className={s.cart__list__item__initial__text}>
            Цена за 1 шт.
          </span>
        </div>
        <ProductCounter
          className={`cart-list__item__counter ${s.cart__list__item__counter} ${s.cart__list__item__inner__block}`}
          count={count}
          setCount={setCount}
          increasePrice={increasePriceWithAnimation}
          decreasePrice={decreasePriceWithAnimation}
          cartItem={item}
          updateCountAsync
        />
        <div
          className={`${s.cart__list__item__price} ${s.cart__list__item__inner__block}`}
        >
          {formatPrice(animatedPrice)} &#8381;
        </div>
      </div>
    </>
  )
}

export default CartListItem
