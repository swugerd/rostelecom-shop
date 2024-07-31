import { getCartItemCountBySize } from '@/lib/utils/common'
import s from '@/styles/product-count-indicator/index.module.scss'
import { IProductCountBySizeProps } from '@/types/goods'

const ProductCountBySize = ({
  products,
  size,
  withCartIcon = true,
}: IProductCountBySizeProps) => (
  <>
    {!!getCartItemCountBySize(products, size) && (
      <span className={`${s.count} ${withCartIcon ? s.with_icon : ''}`}>
        <span>{getCartItemCountBySize(products, size)}</span>
      </span>
    )}
  </>
)

export default ProductCountBySize
