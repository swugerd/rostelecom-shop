import { $user } from '@/context/user'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (user.image) {
      setSrc(user.image)
      return
    }

    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@oneclientjs@@::Q7XWotXvv7IhJe0pVPAU::@@user@@'
      ) as string
    )

    if (!oauthAvatar) {
      return
    }

    setSrc(oauthAvatar.decodedToken.user.photoURL)
  }, [user.image])

  return { src, alt: user.name }
}
