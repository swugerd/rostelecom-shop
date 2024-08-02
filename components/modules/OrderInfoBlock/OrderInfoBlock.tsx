import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { formatPrice, showCountMessage } from '@/lib/utils/common'
import s from '@/styles/order-block/index.module.scss'
import { IOrderInfoBlock } from '@/types/modules'
import Link from 'next/link'
import React, { MutableRefObject, useRef, useState } from 'react'

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage,
}: IOrderInfoBlock) => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useCartByAuth()
  const [isUserAgree, setIsUserAgree] = useState(false)
  const { animatedPrice } = useTotalPrice()

  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>

  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)

  const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

  const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = checkboxRef.current.checked
    }
  }

  return (
    <div className={s.order_block}>
      <div className={s.order_block__inner}>
        <p className={s.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countWholeCartItemsAmount(currentCartByAuth)}`,
            lang
          )}{' '}
          {translations[lang].order.worth}{' '}
          <span className={s.order_block__info__text}>
            {formatPrice(animatedPrice)} &#8381;
          </span>
        </p>
        {isOrderPage && <></>}
        <p className={s.order_block__info}>
          {translations[lang].order.amount_with_discounts}:{' '}
          <span className={s.order_block__info__text}>
            {priceWithDiscount} &#8381;
          </span>
        </p>
        {isOrderPage ? (
          <button />
        ) : (
          <Link
            href='/order'
            className={`${s.order_block__btn} ${!isUserAgree || !currentCartByAuth.length ? s.disabled : ''}`}
          >
            {translations[lang].order.make_order}
          </Link>
        )}
        <label className={s.order_block__agreement}>
          <input
            type='checkbox'
            className={s.order_block__agreement__input}
            tabIndex={-1}
            onChange={handleAgreementChange}
            checked={isUserAgree}
            ref={checkboxRef}
          />
          <span
            className={s.order_block__agreement__checkbox}
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span className={s.order_block__agreement__text}>
            {translations[lang].order.agreement_text}{' '}
            <Link href='/privacy' className={s.order_block__agreement__link}>
              {translations[lang].order.agreement_link}
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock
