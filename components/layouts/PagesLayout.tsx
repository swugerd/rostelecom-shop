'use client'
import { $openAuthPopup } from '@/context/auth'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import { EarthoOneProvider } from '@eartho/one-client-react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { Next13ProgressBar } from 'next13-progressbar'
import { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import CookieAlert from '../modules/CookieAlert/CookieAlert'
import Layout from './Layout'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)

  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  const openAuthPopup = useUnit($openAuthPopup)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=Rostelecom')

    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)

    setIsClient(true)
  }, [])

  return isClient ? (
    <EarthoOneProvider
      clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string}
      domain=''
    >
      <html lang='en'>
        <body>
          <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
          <Layout>{children}</Layout>
          <div
            className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : ''}`}
            onClick={handleCloseQuickViewModal}
          />
          <div
            className={`size-table-overlay ${showSizeTable ? 'overlay-active' : ''}`}
            onClick={handleCloseSizeTable}
          />
          <div
            className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
            onClick={handleCloseAuthPopup}
          />
          {cookieAlertOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className='cookie-popup'
            >
              <CookieAlert setcookieAlertOpen={setCookieAlertOpen} />
            </motion.div>
          )}
          <Toaster position='top-center' reverseOrder={false} />
        </body>
      </html>
    </EarthoOneProvider>
  ) : (
    <html lang='en'>
      <body>
        <></>
      </body>
    </html>
  )
}

export default PagesLayout
