import { useLang } from '@/hooks/useLang'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

const CookieAlert = ({
  setcookieAlertOpen,
}: {
  setcookieAlertOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { lang, translations } = useLang()

  const handleAcceptCookie = () => {
    document.cookie = 'CookieBy=Rostelecom; max-age=' + 60 * 60 * 24 * 30

    if (document.cookie) {
      setcookieAlertOpen(false)
    } else {
      toast.error(
        `Файл cookie не может быть установлен! 
        Пожалуйста, разблокируйте этот сайт с помощью настроек cookie вашего браузера..`
      )
    }
  }

  return (
    <div className='container cookie-popup__container'>
      <button
        className='btn-reset cookie-popup__close'
        onClick={handleAcceptCookie}
      />
      <p
        className='cookie-popup__text'
        dangerouslySetInnerHTML={{
          __html: translations[lang].common.cookie_text,
        }}
      />
      <button
        className='btn-reset cookie-popup__accept'
        onClick={handleAcceptCookie}
      >
        {translations[lang].common.accept}
      </button>
    </div>
  )
}

export default CookieAlert
