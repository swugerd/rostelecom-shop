import { useLang } from '@/hooks/useLang'
import s from '@/styles/empty-content/index.module.scss'

const ContentTtitle = () => {
  const { lang, translations } = useLang()

  return (
    <div className={s.empty_content__title}>
      <span>{translations[lang].common.oh}</span>
      <span>{translations[lang].common.empty_text}</span>
    </div>
  )
}

export default ContentTtitle
