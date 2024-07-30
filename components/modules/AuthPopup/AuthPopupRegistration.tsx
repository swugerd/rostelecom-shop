import { signUpFx } from '@/api/auth'
import { handleSignUp } from '@/context/auth'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useLang } from '@/hooks/useLang'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthPopupClose from './AuthPopupClose'
import AuthPopupSocials from './AuthPopupSocials'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import PasswordInput from './PasswordInput'

const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()
  const { spinner, register, errors, handleSubmit, handleSignUpWithOAuth } =
    useAuthForm(signUpFx.pending, isSideActive, handleSignUp)

  const submitForm = (data: IInputs) =>
    handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      isOauth: false,
    })

  return (
    <div className='card-front'>
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.registration_title}
        </h3>
        <p className='card-body__description'>
          {translations[lang].auth_popup.registration_description}
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].auth_popup.registration_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.registration_question}
              </span>
              <button
                className='btn-reset inner__switch'
                type='button'
                onClick={toggleAuth}
              >
                {translations[lang].auth_popup.login_text}!
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleSignupWithOAuth={handleSignUpWithOAuth} />
      </div>
    </div>
  )
}

export default AuthPopupRegistration
