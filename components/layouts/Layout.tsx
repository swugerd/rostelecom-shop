import { FC, PropsWithChildren } from 'react'
import Header from '../modules/Header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    {children}
    <div className='' />
  </>
)

export default Layout
