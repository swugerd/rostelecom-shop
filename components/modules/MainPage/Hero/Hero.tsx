'use client'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import { AllowedLangs } from '@/constants/lang'
import { useLang } from '@/hooks/useLang'
import img1 from '@/public/img/black-t.png'
import img2 from '@/public/img/orange-t.png'
import img3 from '@/public/img/violet-t.png'
import sAd from '@/styles/ad/index.module.scss'
import s from '@/styles/main-page/index.module.scss'
import ProductSubtitleS from '@/styles/productSubtitle/index.module.scss'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import HeroSlide from './HeroSlide'

const Hero = () => {
  const { lang, translations } = useLang()

  const slides = [
    {
      id: 1,
      title: `${translations[lang].main_page.tShirt} "Line" ${translations[lang].main_page.black}`,
      image: img1,
    },
    {
      id: 2,
      title: `${translations[lang].main_page.tShirt} "Line" ${translations[lang].main_page.orange}`,
      image: img2,
    },
    {
      id: 3,
      title: `${translations[lang].main_page.tShirt} "Line" ${translations[lang].main_page.violet}`,
      image: img3,
    },
  ]

  const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex)

  return (
    <section className={s.hero}>
      <h1 className='visually-hidden'>
        {translations[lang].main_page.hero_hidden_title}
      </h1>
      <div className={`container ${s.hero__container}`}>
        <span className={sAd.ad}>{translations[lang].common.ad}</span>
        <Swiper
          className={s.hero__slider}
          effect='coverflow'
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView='auto'
          initialSlide={2}
          autoplay
          onClick={handleSlideClick}
          modules={[EffectCoverflow]}
          grabCursor
          centeredSlides
        >
          {slides.map((slide) => (
            <SwiperSlide className={s.hero__slider__slide} key={slide.id}>
              <HeroSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ProductSubtitle
          subtitleClassName={ProductSubtitleS.product_subtitle__subtitle}
          subtitleRectClassName={
            ProductSubtitleS.product_subtitle__subtitle__rect
          }
        />
      </div>
      <h2 className={s.hero__title}>
        <span
          className={`${s.hero__title__subtitle} ${lang === AllowedLangs.RU ? '' : s.hero__title__subtitle_lang}`}
        >
          [{translations[lang].main_page.hero_subtitle}]
        </span>
        <span className={s.hero__title__text}>
          {translations[lang].main_page.hero_title}
        </span>
      </h2>
    </section>
  )
}

export default Hero
