import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export type CookieValue = {
  key: string
  value: string
  options?: Omit<Partial<ResponseCookie>, 'maxAge'> & {
    ['Max-age']?: number
  }
}

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
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

export const setNextCookie = (
  res: NextApiResponse | GetServerSidePropsContext['res'],
  cookie: CookieValue[]
) => {
  res.setHeader('set-cookie', getMultiCookieOptions(cookie))
}

export const resetCookie = (
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res'],
  dictionary: string[]
) => {
  const cookies = req.cookies
  const cookiesExpired = Object.entries(cookies)
    .filter(([key]) => dictionary.includes(key))
    .map(([key]) => ({
      key,
      value: 'deleted',
      options: {
        ['Max-age']: 0,
      },
    }))
  setNextCookie(res, cookiesExpired)
}
