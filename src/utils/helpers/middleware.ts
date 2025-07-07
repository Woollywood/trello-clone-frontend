import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import queryString from 'query-string'

import { sessionCookieKey } from '../constants'

import { apiInstance } from './api'
import { createSession, verifySession } from './session'

import { authControllerRefreshToken } from '@/api/generated'
import { deleteSession } from '@/services/session/SessionServer'

export const getRedirectUrl = (req: NextRequest) => {
  return queryString.stringifyUrl({
    url: new URL('/auth/sign-in', req.nextUrl).href,
    query: { redirectURL: req.nextUrl.href },
  })
}

export const isTokenExpired = (token: string) => {
  const { exp } = jwtDecode(token)

  if (!exp) {
    return true
  }

  const now = moment()
  const offset = now.clone().add(10, 'seconds')
  const expirationTime = moment.unix(exp)

  return expirationTime.isSameOrBefore(offset)
}

export const refreshSessionTokensIfExpired = async ({
  session,
  redirect,
  res,
}: {
  session: string
  redirect: NextResponse
  res: NextResponse
}) => {
  try {
    const {
      payload: { accessToken, refreshToken },
    } = await verifySession(session)

    if (!isTokenExpired(accessToken)) {
      return res
    }

    const apiClient = apiInstance.serverInstance
    const newTokens = await authControllerRefreshToken(
      { refreshToken },
      { client: apiClient }
    )
    const newSession = await createSession(newTokens)
    console.log('NEW TOKENS FROM MIDDLEWARE')
    console.log({ newTokens })

    res.cookies.set(sessionCookieKey, newSession)
    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      await deleteSession()
      return redirect
    }
  }
}
