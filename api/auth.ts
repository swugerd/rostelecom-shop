import { setIsAuth } from '@/context/auth'
import { onAuthSuccess } from '@/lib/utils/auth'
import { handleJWTError } from '@/lib/utils/error'
import { ISignUpFx } from '@/types/authPopup'
import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import api from './apiInstance'

export const oauthFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
    try {
      const { data } = await api.post('/api/users/oauth', {
        name,
        password,
        email,
      })

      await api.post('/api/users/email', {
        password,
        email,
      })

      onAuthSuccess('Login successful', data)

      return data.user
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const signUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      await oauthFx({
        email,
        password,
        name,
      })
      return
    }

    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Registration successful!', data)

    return data
  }
)

export const signInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      await oauthFx({
        email,
        password,
      })
      return
    }

    const { data } = await api.post('/api/users/login', { email, password })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Login successful!', data)

    return data
  }
)

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)

    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})
