import type { ReactElement, ReactNode } from 'react'

import { DehydratedState } from '@tanstack/react-query'
import { NextPage } from 'next'

import { TokensDto } from '@/api/generated'

export type NextPageWithLayout<
  P = Record<string, unknown>,
  IP = P,
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface ProtectedRouteProps {
  tokens: TokensDto
}

export interface DehydratedRouteProps {
  dehydratedState: DehydratedState
}

export type ProtectedDehydratedRouteProps = ProtectedRouteProps &
  DehydratedRouteProps
