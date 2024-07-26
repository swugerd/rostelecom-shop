import s from '@/styles/tooltip/index.module.scss'

const Tooltip = ({ text }: { text: string }) => (
  <div className={s.tooltip__inner}>
    <span className={s.tooltip__text}>{text}</span>
  </div>
)

export default Tooltip
