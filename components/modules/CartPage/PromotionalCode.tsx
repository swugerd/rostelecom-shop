import { useLang } from '@/hooks/useLang'
import s from '@/styles/cart-page/index.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'

const PromotionalCode = ({
  setIsCorrectPromotionalCode,
}: {
  setIsCorrectPromotionalCode: Dispatch<SetStateAction<boolean>>
}) => {
  const { lang, translations } = useLang()
  const [value, setValue] = useState('')
  const isCorrectCode = value === 'hamster'

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsCorrectPromotionalCode(e.target.value === 'hamster')
  }

  return (
    <div className={s.cart__promotional_code}>
      <input
        type='text'
        placeholder={translations[lang].order.promocode}
        value={value}
        style={isCorrectCode ? { border: '1px solid #16D9A6' } : {}}
        onChange={handleChangeValue}
      />
      <p>{translations[lang].order.promo_code_text}</p>
    </div>
  )
}

export default PromotionalCode
