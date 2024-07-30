import PagesLayout from '@/components/layouts/PagesLayout'
import type { Metadata } from 'next'
import './globalStyles/auth-popup.css'
import './globalStyles/cart-popup.css'
import './globalStyles/catalog-menu.css'
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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PagesLayout>{children}</PagesLayout>
}
