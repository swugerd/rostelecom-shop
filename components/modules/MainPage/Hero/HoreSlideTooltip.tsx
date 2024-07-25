import s from '@/styles/main-page/index.module.scss'
import { IHeroSlideTooltip } from '@/types/main-page'
import Image from 'next/image'

const HeroSlideTooltip = ({ title, image }: IHeroSlideTooltip) => (
  <div className={`${s.hero__slider__slide__popup} slide-popup`}>
    <span className={s.hero__slider__slide__popup__arrow} />
    <Image
      className={s.hero__slider__slide__popup__img}
      src={image}
      alt={title}
    />
    <p className={s.hero__slider__slide__popup__inner}>
      <b className={s.hero__slider__slide__popup__title}>{title}</b>
      <span className={s.hero__slider__slide__popup__price}>760 &#8381;</span>
    </p>
  </div>
)

export default HeroSlideTooltip
