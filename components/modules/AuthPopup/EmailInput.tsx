import { useLang } from '@/hooks/useLang'
import { emailValidationRules } from '@/lib/utils/auth'
import s from '@/styles/auth-popup/index.module.scss'
import { IAuthInput } from '@/types/authPopup'

const EmailInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <input
        type='email'
        className='form__block__input'
        placeholder='Email'
        {...register(
          'email',
          emailValidationRules(
            translations[lang].validation.invalid_email,
            translations[lang].validation.required_email
          )
        )}
      />
      {errors.email && (
        <span className={s.error_alert}>{errors.email?.message}</span>
      )}
    </div>
  )
}

export default EmailInput
