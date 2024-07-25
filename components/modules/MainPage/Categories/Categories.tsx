'use client'
import Alllink from '@/components/elements/AllLink/Alllink'
import useImagePreloader from '@/hooks/useImagePreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import img1 from '@/public/img/categories-img-1.png'
import img2 from '@/public/img/categories-img-2.png'
import img3 from '@/public/img/categories-img-3.png'
import img4 from '@/public/img/categories-img-4.png'
import s from '@/styles/main-page/index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import MainSlider from '../MainSlider'

const Categories = () => {
  const { lang, translations } = useLang()
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? s.img_loading : ''

  const images = [
    { src: img1, id: 1, title: translations[lang].main_page.category_cloth },
    {
      src: img2,
      id: 2,
      title: translations[lang].main_page.category_accessories,
    },
    {
      src: img3,
      id: 3,
      title: translations[lang].main_page.category_souvenirs,
    },
    { src: img4, id: 4, title: translations[lang].main_page.category_office },
  ]

  return (
    <section className={s.categories}>
      <div className={`container ${s.categories__container}`}>
        <h2 className={`site-title ${s.categories_title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={s.categories__inner}>
          <Alllink />
          {!isMedia490 && (
            <>
              <Link
                href='/catalog/cloth'
                className={`${s.categories__right} ${s.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img1}
                  alt='Cloth'
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>{translations[lang].main_page.category_cloth}</span>
              </Link>
              <div className={s.categories__left}>
                <div className={s.categories__left__top}>
                  <Link
                    href='/catalog/accessories'
                    className={`${s.categories__right} ${s.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img2}
                      alt='Accessories'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].main_page.category_accessories}
                    </span>
                  </Link>
                  <Link
                    href='/catalog/souvenirs'
                    className={`${s.categories__right} ${s.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img3}
                      alt='Souvenirs'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].main_page.category_souvenirs}
                    </span>
                  </Link>
                  <Link
                    href='/catalog/office'
                    className={`${s.categories__right} ${s.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img4}
                      alt='Office'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>{translations[lang].main_page.category_office}</span>
                  </Link>
                </div>
              </div>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  )
}

export default Categories
