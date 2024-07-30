import { useLang } from '@/hooks/useLang'
import s from '@/styles/auth-popup/index.module.scss'
import { IAuthInput } from '@/types/authPopup'

const PasswordInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <input
        type='password'
        className='form__block__input'
        placeholder={translations[lang].auth_popup.password}
        {...register('password', {
          required: translations[lang].validation.required_password,
          minLength: 4,
          maxLength: 20,
        })}
      />
      {errors.password && (
        <span className={s.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password?.type === 'minLength' && (
        <span className={s.error_alert}>
          {translations[lang].validation.min_4}
        </span>
      )}
      {errors.password && errors.password?.type === 'maxLength' && (
        <span className={s.error_alert}>
          {translations[lang].validation.max_20}
        </span>
      )}
    </div>
  )
}

export default PasswordInput
