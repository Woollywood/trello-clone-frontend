import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { withParamValidation } from 'next-typesafe-url/app/hoc'
import { Suspense } from 'react'

import { Route, RouteType } from './routeType'

import {
  workspaceControllerListMembersInfiniteQueryOptions,
  workspaceControllerListUsersInfiniteQueryOptions,
} from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { WorkspaceMembers } from '@/modules/WorkspaceMembers'

type Props = InferPagePropsType<RouteType>

const WorkspaceMembersSuspense: NextPage<
  Awaited<Props['routeParams']> & Awaited<Props['searchParams']>
> = async ({ id, type = 'members', search }) => {
  const queryClient = new QueryClient()
  const client = await createServerInstance()

  switch (type) {
    case 'members':
      await queryClient.prefetchInfiniteQuery(
        workspaceControllerListMembersInfiniteQueryOptions(
          id,
          { search },
          { client }
        )
      )
      break
    case 'users':
      await queryClient.prefetchInfiniteQuery(
        workspaceControllerListUsersInfiniteQueryOptions(
          id,
          { search },
          { client }
        )
      )
      break
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceMembers id={id} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = async ({
  routeParams,
  searchParams,
}) => {
  const { type, ...paginationParams } = await searchParams
  const { id } = await routeParams

  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <WorkspaceMembersSuspense
        id={id}
        type={type}
        {...paginationParams}
      />
    </Suspense>
  )
}

export default withParamValidation(Page, Route)
