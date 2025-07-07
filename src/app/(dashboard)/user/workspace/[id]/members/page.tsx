import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { Suspense } from 'react'

import {
  workspaceControllerListMembersInfiniteQueryOptions,
  workspaceControllerListUsersInfiniteQueryOptions,
} from '@/api/generated'
import { WorkspaceMembers } from '@/modules/WorkspaceMembers'
import { WorkspaceMembersType } from '@/modules/WorkspaceMembers/types'
import { PaginationParams } from '@/types'
import { apiInstance } from '@/utils/helpers'

type SearchParams = PaginationParams & { type?: WorkspaceMembersType }

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<SearchParams>
}

const WorkspaceMembersSuspense: NextPage<
  { id: string } & SearchParams
> = async ({ id, type = 'members', search }) => {
  const queryClient = new QueryClient()
  const client = apiInstance.serverInstance

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

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { type, ...paginationParams } = await searchParams
  const { id } = await params

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

export default Page
