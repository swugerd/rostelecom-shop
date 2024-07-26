import s from '@/styles/product-item-action-btn/index.module.scss'
import tooltipS from '@/styles/tooltip/index.module.scss'
import { IProductItemActionBtnProps } from '@/types/elements'
import { AnimatePresence, motion } from 'framer-motion'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Tooltip from '../Tooltip/Tooltip'

const ProductItemActionBtn = ({
  text,
  callback,
  iconClass,
  withTooltip = true,
  marginBottom,
}: IProductItemActionBtnProps) => {
  const [open, setOpen] = useState(false)
  const [tooltipLeft, setTooltipLeft] = useState(0)

  const showTooltip = () => setOpen(true)
  const hideTooltip = () => setOpen(false)

  const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (open && withTooltip) {
      setTooltipLeft(tooltipRef.current.clientWidth)
    }
  }, [open, withTooltip])

  return (
    <div className={s.actions}>
      <button
        className={`btn-reset ${s.actions__btn} ${s[iconClass]}`}
        onClick={callback}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ marginBottom: marginBottom || 16 }}
      />

      {withTooltip && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={tooltipS.tooltip}
              style={{ left: `-${tooltipLeft + 13}px` }}
              ref={tooltipRef}
            >
              <Tooltip text={text} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default ProductItemActionBtn
