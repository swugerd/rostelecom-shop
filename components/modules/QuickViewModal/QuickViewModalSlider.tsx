/* eslint-disable @next/next/no-img-element */
import QuickViewModalSliderArrow from '@/components/elements/QuickViewModalSliderArrow/QuickViewModalSliderArrow'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import s from '@/styles/quick-view-modal/index.module.scss'
import Slider from 'react-slick'

const QuickViewModalSlider = ({
  images,
}: {
  images: {
    src: string
    alt: string
    id: string
  }[]
}) => {
  const isMedia1070 = useMediaQuery(1070)
  const isMedia890 = useMediaQuery(890)

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    dotsClass: `list-reset ${s.modal__left__slider__slide__dots} quick-modal-dots`,
    nextArrow: <QuickViewModalSliderArrow directionClassName={s.next} />,
    prevArrow: <QuickViewModalSliderArrow directionClassName={s.prev} />,
    appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
    customPaging: () => (
      <button className={`btn-reset ${s.modal__left__slider__slide__dot}`} />
    ),
  }

  return (
    <Slider {...settings} className={s.modal__left__slider}>
      {images.map((item) => (
        <div
          key={item.id}
          className={s.modal__left__slider__slide}
          style={{ width: isMedia890 ? 270 : isMedia1070 ? 350 : 480 }}
        >
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default QuickViewModalSlider
