import { deleteProductFromCart, setCartFromLS } from '@/context/cart'
import { deleteProductFromLS, isUserAuth } from '@/lib/utils/common'
import { ICartItem } from '@/types/cart'
import { useState } from 'react'
import { usePriceAction } from './usePriceAction'
import { usePriceAnimation } from './usePriceAnimation'

export const useCartItemAction = (cartItem: ICartItem) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false)
  const [count, setCount] = useState(+cartItem.count)

  const { price, increasePrice, decreasePrice } = usePriceAction(
    +cartItem.count,
    +cartItem.price
  )

  const {
    setFrom,
    setTo,
    value: animatedPrice,
  } = usePriceAnimation(+cartItem.price, +cartItem.price * +cartItem.count)

  const increasePriceWithAnimation = () => {
    setFrom(price)
    setTo(price + +cartItem.price)
    increasePrice()
  }

  const decreasePriceWithAnimation = () => {
    setFrom(price)
    setTo(price - +cartItem.price)
    decreasePrice()
  }

  const handleDeleteCartItem = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        cartItem.clientId,
        'cart',
        setCartFromLS,
        'Удалено из корзины!'
      )
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    deleteProductFromLS(cartItem.clientId, 'cart', setCartFromLS, '', false)
    deleteProductFromCart({
      jwt: auth.accessToken,
      id: cartItem._id,
      setSpinner: setDeleteSpinner,
    })
  }

  return {
    deleteSpinner,
    setDeleteSpinner,
    price,
    count,
    setCount,
    increasePrice,
    decreasePrice,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    setFrom,
    setTo,
    animatedPrice,
    handleDeleteCartItem,
  }
}
