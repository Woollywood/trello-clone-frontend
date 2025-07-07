import { jwtVerify, SignJWT } from 'jose'
import moment from 'moment'
import Cookies from 'universal-cookie'

import { ENV_CONFIG, sessionCookieKey } from '../constants'

import { TokensDto } from '@/api/generated'

const secretKey = ENV_CONFIG.SESSION_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export const verifySession = async (session: string) =>
  await jwtVerify<TokensDto>(session, encodedKey)

export const createSession = async (payload: TokensDto) => {
  const expiredAt = moment().add(7, 'days').toDate()

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey)
}

export const getSessionTokens =
  async (): Promise<TokensDto | null> => {
    const cookies = new Cookies()
    const session = cookies.get<string | null>(sessionCookieKey)
    if (!session) {
      return null
    }
    const {
      payload: { accessToken, refreshToken },
    } = await verifySession(session)
    return { accessToken, refreshToken }
  }
