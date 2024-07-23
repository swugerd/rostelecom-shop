import Image from 'next/image'
import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href='/'>
    <Image
      className='logo__img'
      src='/img/logo.svg'
      alt='Rostelecom Logo'
      width='197'
      height='50'
    />
  </Link>
)

export default Logo
