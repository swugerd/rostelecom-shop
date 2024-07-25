import s from '@/styles/main-page/index.module.scss'
import { IHeroSlide } from '@/types/main-page'
import Image from 'next/image'
import Link from 'next/link'
import HeroSlideTooltip from './HoreSlideTooltip'

const HeroSlide = ({ slide }: { slide: IHeroSlide }) => (
  <>
    <Link href='/catalog' className='hero-slide-plus' />
    <Image
      src={slide.image}
      alt={slide.title}
      className={s.hero__slider__slide__img}
    />
    <HeroSlideTooltip title={slide.title} image={slide.image} />
  </>
)

export default HeroSlide
