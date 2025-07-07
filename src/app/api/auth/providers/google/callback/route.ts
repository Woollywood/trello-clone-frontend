import { NextRequest, NextResponse } from 'next/server'

import { ENV_CONFIG, sessionCookieKey } from '@/utils/constants'
import { createSession } from '@/utils/helpers'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  const redirectURL = searchParams.get('redirectURL')

  if (!accessToken || !refreshToken) {
    return new Response('Invalid tokens', { status: 401 })
  }

  const newSession = await createSession({
    accessToken,
    refreshToken,
  })
  const redirect = NextResponse.redirect(
    redirectURL ?? ENV_CONFIG.AUTH_REDIRECT_URL
  )
  redirect.cookies.set(sessionCookieKey, newSession)
  return redirect
}
