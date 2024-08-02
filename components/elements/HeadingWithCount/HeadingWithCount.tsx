import { useLang } from '@/hooks/useLang'
import { showCountMessage } from '@/lib/utils/common'
import s from '@/styles/heading-with-count/index.module.scss'
import { IHeadingWithCountProps } from '@/types/elements'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeadingWithCount = ({
  count,
  title,
  spinner,
}: IHeadingWithCountProps) => {
  const { lang } = useLang()

  return (
    <h1 className={`site-title ${s.title}`}>
      <span>{title}</span>
      <span className={s.title__count}>
        {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}{' '}
        {showCountMessage(`${count}`, lang)}
      </span>
    </h1>
  )
}

export default HeadingWithCount
