import { DynamicRoute } from 'next-typesafe-url'
import { z } from 'zod'

export const SearchRoute = {
  searchParams: z.object({ search: z.string().optional() }),
} satisfies DynamicRoute

export type SearchRouteType = typeof SearchRoute
