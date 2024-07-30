import { sendMail } from '@/service/mailService'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const res = await req.json()

  try {
    await sendMail(
      'Rostelecom Shop',
      res.email,
      `Ваши данные для входа - пароль: ${res.password}, логин: ${res.email}`
    )

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message })
  }
}
