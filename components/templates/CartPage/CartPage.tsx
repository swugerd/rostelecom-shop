'use client'
import { getCartItemsFx } from '@/api/cart'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import CartList from '@/components/modules/CartPage/CartList'
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { basePropsForMotion } from '@/constants/motion'
import { $shouldShowEmpty } from '@/context/cart'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import s from '@/styles/cart-page/index.module.scss'
import cartSkeletonS from '@/styles/cart-skeleton/index.module.scss'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useCartByAuth()
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('cart')
  const isMedia930 = useMediaQuery(930)
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] =
    useState(false)
  const shouldShowEmpty = useUnit($shouldShowEmpty)

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      {!shouldShowEmpty ? (
        <section className={s.cart}>
          <div className='container'>
            <HeadingWithCount
              count={countWholeCartItemsAmount(currentCartByAuth)}
              title={translations[lang].breadcrumbs.cart}
              spinner={cartSpinner}
            />
            <div className={s.cart__inner}>
              <div className={s.cart__left}>
                {cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={cartSkeletonS.skeleton}
                  >
                    {Array.from(new Array(3)).map((_, i) => (
                      <li key={i} className={cartSkeletonS.skeletion__item}>
                        <div className={cartSkeletonS.skeleton__item__light} />
                      </li>
                    ))}
                  </motion.ul>
                )}
                {!cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={`list-reset ${s.cart__list}`}
                  >
                    <CartList />
                  </motion.ul>
                )}
              </div>
              <div className={s.cart__right}>
                {isMedia930 && (
                  <PromotionalCode
                    setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                  />
                )}
                <div className={s.cart__right__order}>
                  <OrderInfoBlock
                    isCorrectPromotionalCode={isCorrectPromotionalCode}
                  />
                </div>
              </div>
            </div>
            {!isMedia930 && (
              <PromotionalCode
                setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
              />
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.cart_empty}
              description={translations[lang].common.cart_empty_advice}
              btnText={translations[lang].common.go_shopping}
              bgClassName={s.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage
