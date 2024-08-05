import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import s from '@/styles/empty-content/index.module.scss'
import { IEmptyPageContentProps } from '@/types/modules'
import ContentLinks from './ContentLinks'
import ContentTtitle from './ContentTtitle'

const EmptyPageContent = ({
  bgClassName,
  btnText,
  description,
  subtitle,
}: IEmptyPageContentProps) => {
  const { lang, translations } = useLang()
  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)

  return (
    <div className={s.empty_content}>
      {isMedia950 && <ContentTtitle />}
      <div className={`${s.empty_content__bg} ${bgClassName}`} />
      <div className={s.empty_content__inner}>
        <span className={s.empty_content__word}>
          {translations[lang].common.empty}
        </span>
        {!isMedia950 && <ContentTtitle />}
        <div className={s.empty_content__subtitle}>{subtitle}</div>
        <div className={s.empty_content__description}>{description}</div>
        {!isMedia500 && <ContentLinks btnText={btnText} />}
      </div>
      {isMedia500 && <ContentLinks btnText={btnText} />}
    </div>
  )
}

export default EmptyPageContent
