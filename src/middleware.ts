import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { sessionCookieKey } from './utils/constants'
import {
  getRedirectUrl,
  refreshSessionTokensIfExpired,
} from './utils/helpers/middleware'

export async function middleware(req: NextRequest) {
  console.log('MIDDLEWARE')

  const redirect = NextResponse.redirect(getRedirectUrl(req))

  const session = (await cookies()).get(sessionCookieKey)

  if (!session) {
    return redirect
  }

  const res = NextResponse.next()
  return await refreshSessionTokensIfExpired({
    res,
    session: session.value,
    redirect,
  })
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|auth/*|api/auth/*|api/session/*|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
