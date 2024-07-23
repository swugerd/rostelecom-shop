import { useLang } from '@/hooks/useLang'
import Link from 'next/link'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      {' '}
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+74995558293'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +7 (499) 555 82 93
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:test@gmail.com'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://t.me/swugerd'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='https://vk.com' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.vk}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
