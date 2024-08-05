import PagesLayout from '@/components/layouts/PagesLayout'
import type { Metadata, Viewport } from 'next'
import './globalStyles/auth-popup.css'
import './globalStyles/breadcrumbs.css'
import './globalStyles/cart-popup.css'
import './globalStyles/catalog-menu.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/footer.css'
import './globalStyles/globals.css'
import './globalStyles/header-profile.css'
import './globalStyles/header.css'
import './globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/normalize.css'
import './globalStyles/search-modal.css'
import './globalStyles/slick-theme.css'
import './globalStyles/slick.css'

export const metadata: Metadata = {
  title: 'Rostelecom',
  description: 'Rostelecom магазин одежды, аксессуаров, канцелярии и сувениров',
}

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PagesLayout>{children}</PagesLayout>
}
