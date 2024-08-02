import { CustomArrowProps } from 'react-slick'

export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductItemActionBtnProps {
  text: string
  iconClass: string
  callback?: VoidFunction
  withTooltip?: boolean
  marginBottom?: number
}

export interface IProductAvailableProps {
  vendorCode: string
  inStock: number
}

export interface QuickViewModalSliderArrowProps extends CustomArrowProps {
  directionClassName: string
}

export interface IHeadingWithCountProps {
  count: number
  title: string
  spinner?: boolean
}
