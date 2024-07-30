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
import { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  const openAuthPopup = useUnit($openAuthPopup)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  useEffect(() => setIsClient(true), [])

  return (
    <>
      {isClient && (
        <EarthoOneProvider
          clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string}
          domain=''
        >
          <html lang='en'>
            <body>
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
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      )}
    </>
  )
}

export default PagesLayout
