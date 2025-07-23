import { DynamicRoute } from 'next-typesafe-url'
import { z } from 'zod'

import { WorkspaceMembersEnum } from '@/modules/WorkspaceMembers/types'
import { SearchRoute } from '@/utils/constants'

export const Route = {
  routeParams: z.object({ id: z.string() }),
  searchParams: SearchRoute.searchParams.extend({
    type: z.nativeEnum(WorkspaceMembersEnum).optional(),
  }),
} satisfies DynamicRoute

export type RouteType = typeof Route
