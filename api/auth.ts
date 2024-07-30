import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '@/types/authPopup'
import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import api from './apiInstance'

export const signUpFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
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

export const signInFx = createEffect(async ({ email, password }: ISignUpFx) => {
  const { data } = await api.post('/api/users/login', { email, password })

  if (data.warningMessage) {
    toast.error(data.warningMessage)
    return
  }

  onAuthSuccess('Login successful!', data)

  return data
})
