/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import s from '@/styles/quick-view-modal/index.module.scss'
import { IProductSizesItemProps } from '@/types/goods'

const ProductSizesItem = ({
  currentSize,
  selectedSize,
  setSelectedSize,
  currentCartItems,
}: IProductSizesItemProps) => {
  const handleSelectSize = () => setSelectedSize(currentSize[0])

  return (
    <li
      className={`${s.modal__right__info__sizes__item} ${
        currentSize[1] ? '' : s.modal__right__info__sizes__item__not_available
      }`}
      style={{
        backgroundColor:
          currentSize[0] === selectedSize
            ? '#9466FF'
            : 'rgba(255, 255, 255, 0.10)',
      }}
    >
      <button className='btn-reset' onClick={handleSelectSize}>
        {currentSize[0].toLocaleUpperCase()}
      </button>
    </li>
  )
}

export default ProductSizesItem
