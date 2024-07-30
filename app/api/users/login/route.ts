import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  generateTokens,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    return NextResponse.json({
      warningMessage: `User doesn't exists`,
    })
  }

  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
      warningMessage: 'Wrong login or password',
    })
  }

  const tokens = generateTokens(user.name, reqBody.email)

  return NextResponse.json(tokens)
}
