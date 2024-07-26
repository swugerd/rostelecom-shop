import Alllink from '@/components/elements/AllLink/Alllink'
import { basePropsForMotion } from '@/constants/motion'
import s from '@/styles/main-page/index.module.scss'
import skeletonS from '@/styles/skeleton/index.module.scss'
import { IMainPageSectionProps } from '@/types/main-page'
import { motion } from 'framer-motion'
import ProductListItem from '../ProductListItem/ProductListItem'

const MainPageSection = ({ title, goods, spinner }: IMainPageSectionProps) => (
  <section className={s.main_section}>
    <div className={`container ${s.main_section__container}`}>
      <span className={s.main_section__bg}>{title}</span>
      <h2 className={`site-title ${s.main_section__title}`}>{title}</h2>
      <div className={s.main_section__inner}>
        <Alllink />
        {spinner && (
          <motion.ul className={skeletonS.skeleton} {...basePropsForMotion}>
            {Array.from(new Array(4)).map((_, i) => (
              <li key={i} className={skeletonS.skeleton__item}>
                <div className={skeletonS.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
        {!spinner && (
          <motion.ul
            className={`list-reset ${s.main_section__list}`}
            {...basePropsForMotion}
          >
            {goods.map((item) => (
              <ProductListItem key={item._id} item={item} title={title} />
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  </section>
)

export default MainPageSection
