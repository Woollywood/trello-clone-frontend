'use server'

import { cookies } from 'next/headers'

import { TokensDto } from '@/api/generated'
import { sessionCookieKey } from '@/utils/constants'
import { createSession, verifySession } from '@/utils/helpers'

export const getSessionTokens =
  async (): Promise<TokensDto | null> => {
    const cookie = await cookies()
    const session = cookie.get(sessionCookieKey)
    if (!session) {
      return null
    }
    const {
      payload: { accessToken, refreshToken },
    } = await verifySession(session.value)
    return { accessToken, refreshToken }
  }

export const setSessionByTokens = async (tokens: TokensDto) => {
  const newSession = await createSession(tokens)
  const cookie = await cookies()
  cookie.set(sessionCookieKey, newSession)
  return newSession
}

export const deleteSession = async () => {
  const cookie = await cookies()
  cookie.delete(sessionCookieKey)
}
