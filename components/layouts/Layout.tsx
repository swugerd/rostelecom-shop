'use client'
import { $searchModal } from '@/context/modals'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { handleCloseSearchModal } from '@/lib/utils/common'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'
import Footer from '../modules/Footer/Footer'
import Header from '../modules/Header/Header'
import SearchModal from '../modules/Header/SearchModal'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const isMedia800 = useMediaQuery(800)
  const searchModal = useUnit($searchModal)

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <AnimatePresence>
        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`header__search-overlay ${searchModal ? 'overlay-active' : ''}`}
        onClick={handleCloseSearchModal}
      />
      <Footer />
    </>
  )
}

export default Layout
