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
  bgWordClassName,
  emptyWord,
  oopsWord,
  title,
}: IEmptyPageContentProps) => {
  const { lang, translations } = useLang()
  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)

  const currentTitle = title || translations[lang].common.empty_text
  const currentOopsWord = oopsWord || translations[lang].common.ops

  return (
    <div className={s.empty_content}>
      {isMedia950 && (
        <ContentTtitle title={currentTitle} oopsWord={currentOopsWord} />
      )}
      <div className={`${s.empty_content__bg} ${bgClassName}`} />
      <div className={s.empty_content__inner}>
        <span className={`${s.empty_content__word} ${bgWordClassName || ''}`}>
          {emptyWord || translations[lang].common.empty}
        </span>
        {!isMedia950 && (
          <ContentTtitle title={currentTitle} oopsWord={currentOopsWord} />
        )}
        <div
          className={s.empty_content__subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        <div className={s.empty_content__description}>{description}</div>
        {!isMedia500 && <ContentLinks btnText={btnText} />}
      </div>
      {isMedia500 && <ContentLinks btnText={btnText} />}
    </div>
  )
}

export default EmptyPageContent
