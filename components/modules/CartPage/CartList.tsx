import { basePropsForMotion } from '@/constants/motion'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import s from '@/styles/cart-page/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import CartListItem from './CartListItem'

const CartList = () => {
  const currentCartByAuth = useCartByAuth()

  return (
    <>
      <AnimatePresence>
        {currentCartByAuth.map((item) => (
          <motion.li
            key={item._id || item.clientId}
            {...basePropsForMotion}
            className={s.cart__list__item}
          >
            <CartListItem item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </>
  )
}

export default CartList
