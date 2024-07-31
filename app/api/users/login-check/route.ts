import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { db, validateTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )

    if (validateTokenResult.status !== 200) {
      return NextResponse.json(validateTokenResult)
    }

    const user = await findUserByEmail(db, parseJwt(token as string).email)

    return NextResponse.json({ status: 200, message: 'token is valid', user })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
