import { Dispatch, SetStateAction } from 'react'

export interface ILoadOneProductFx {
  productId: string
  category: string
}

export interface IProductSizesItemProps {
  currentSize: [string, boolean]
  selectedSize: string
  setSelectedSize: Dispatch<SetStateAction<string>>
  currentCartItems: []
}

export interface IProductCounterProps {
  className: string
  count: number
}

export interface IAddToCartBtnProps {
  text: string
  className?: string
}
