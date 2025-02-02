import { IInputs, ISignUpFx } from '@/types/authPopup'
import { useEarthoOne } from '@eartho/one-client-react'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const useAuthForm = (
  initialSpinner: Store<boolean>,
  isSideActive: boolean,
  event: EventCallable<ISignUpFx>
) => {
  const spinner = useUnit(initialSpinner)
  const { isConnected, user, connectWithPopup } = useEarthoOne()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  useEffect(() => {
    if (isSideActive) {
      if (isConnected) {
        event({
          name: user?.displayName as string,
          email: user?.email as string,
          password: user?.uid as string,
          isOAuth: true,
        })
      }
    }
  }, [isConnected])

  const handleSignUpWithOAuth = () =>
    connectWithPopup({
      accessId: process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID as string,
    })

  return {
    spinner,
    register,
    errors,
    handleSubmit,
    handleSignUpWithOAuth,
  }
}
