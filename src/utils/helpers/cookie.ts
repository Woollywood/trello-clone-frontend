/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'

export type CookieValue = {
  key: string
  value: string
  options?: Record<string, string | boolean>
}

enum tokenKeys {
  token = 'token',
  sessionState = 'sessionState',
  refreshToken = 'refreshToken',
  expiresIn = 'expiresIn',
}

export type TokeKey = `${tokenKeys}`

export type AbstractTokenConfig = {
  [key in TokeKey]: string
}

export const getCookieOptions = (cookie: CookieValue) => {
  const options = { path: '/', ...cookie.options }
  const optionsStr = Object.keys(options)
    .map((key) => {
      const typedKey = key as keyof typeof options
      if (typeof options[typedKey] === 'boolean') {
        return key
      }
      return `${key}=${options[typedKey]}`
    })
    .join('; ')
  return `${cookie['key']}=${cookie['value']}; ` + optionsStr
}

export const getMultiCookieOptions = (cookies: CookieValue[]) =>
  cookies.map((cookie) => getCookieOptions(cookie))

export const setNextCookie = (res: NextApiResponse, cookie: CookieValue[]) => {
  res.setHeader('set-cookie', getMultiCookieOptions(cookie))
}

export const setTokenCookie = (
  res: NextApiResponse,
  data: any,
  dictionary: any = {}
) => {
  const { expiresIn, refreshExpiresIn, token, sessionState, refreshToken } =
    data

  setNextCookie(res, [
    {
      key: dictionary.token,
      value: token,
      options: {
        ['Max-Age']: expiresIn,
      },
    },
    {
      key: dictionary.sessionState,
      value: sessionState,
    },
    {
      key: dictionary.refreshToken,
      value: refreshToken,
      options: { httpOnly: true, ['Max-Age']: refreshExpiresIn },
    },
  ])
}

export const setOauthTokenCookie = (res: NextApiResponse, data: any) => {
  const { expires_in, access_token, refresh_token } = data
  setNextCookie(res, [
    {
      key: 'token',
      value: access_token,
      options: { ['Max-Age']: expires_in.toString() },
    },
    {
      key: 'refreshToken',
      value: refresh_token,
      options: { httpOnly: true },
    },
  ])
}

export const resetCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  dictionary: any = {}
) => {
  const cookies = req.cookies
  const cookiesExpired = Object.entries(cookies)
    .filter(([key]) => Object.keys(dictionary).includes(key))
    .map(([key]) => ({
      key,
      value: 'deleted',
      options: {
        'Max-Age': '0',
      },
    }))
  setNextCookie(res, cookiesExpired)
}
