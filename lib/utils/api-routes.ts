import bcrypt from 'bcryptjs'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Db, MongoClient } from 'mongodb'
import { shuffle } from './common'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
  const clothes = await db.collection('cloth').find().toArray()
  const accessories = await db.collection('accessories').find().toArray()

  return shuffle([
    ...clothes
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
    ...accessories
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
  ])
}

export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    {
      name,
      email,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    {
      email,
    },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    {
      expiresIn: '30d',
    }
  )

  return { accessToken, refreshToken }
}

export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; password: string; email: string }
) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    password: hash,
    email: reqBody.email,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })

export const getAuthRouteData = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  withReqBody = true
) => {
  const { db, reqBody } = await getDbAndReqBody(
    clientPromise,
    withReqBody ? req : null
  )

  const token = req.headers.get('authorization')?.split(' ')[1]
  const validateTokenResult = await isValidAccessToken(token)

  return { db, reqBody, validateTokenResult, token }
}

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }

  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
