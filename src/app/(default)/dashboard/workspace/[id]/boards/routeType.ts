import { DynamicRoute } from 'next-typesafe-url'
import { z } from 'zod'

import { SearchRoute } from '@/utils/constants'

export const Route = {
  routeParams: z.object({ id: z.string() }),
  searchParams: SearchRoute.searchParams,
} satisfies DynamicRoute

export type RouteType = typeof Route
