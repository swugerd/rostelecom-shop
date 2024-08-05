import s from '@/styles/empty-content/index.module.scss'
import { IContentTitleProps } from '@/types/modules'

const ContentTtitle = ({ title, oopsWord }: IContentTitleProps) => (
  <div className={s.empty_content__title}>
    <span>{oopsWord}</span>
    <span>{title}</span>
  </div>
)

export default ContentTtitle
