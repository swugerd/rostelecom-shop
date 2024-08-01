import { Dispatch, SetStateAction } from 'react'
import { ICartItem } from './cart'

export interface ILoadOneProductFx {
  productId: string
  category: string
}

export interface IProductSizesItemProps {
  currentSize: [string, boolean]
  selectedSize: string
  setSelectedSize: Dispatch<SetStateAction<string>>
  currentCartItems: ICartItem[]
}

export interface IProductCounterProps {
  className: string
  count: number
  setCount: Dispatch<SetStateAction<number>>
  cartItem: ICartItem
  updateCountAsync: boolean
  initialCount?: number
  totalCount?: number
  increasePrice?: VoidFunction
  decreasePrice?: VoidFunction
}

export interface IAddToCartBtnProps {
  text: string
  className?: string
  handleAddToCart: VoidFunction
  addToCartSpinner: boolean
  btnDisabled?: boolean
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}
