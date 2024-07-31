import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'
import { IUser } from '@/types/user'
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

    const user = (await findUserByEmail(
      db,
      parseJwt(token as string).email
    )) as unknown as IUser

    return NextResponse.json({
      status: 200,
      message: 'token is valid',
      user: { email: user.email, name: user.name, _id: user?._id },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
