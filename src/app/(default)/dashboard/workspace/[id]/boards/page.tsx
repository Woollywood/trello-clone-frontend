import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { Suspense } from 'react'

import { workspaceControllerListBoardsInfiniteQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { WorkspaceBoardList } from '@/modules/WorkspaceBoardList'
import { PaginationParams } from '@/types'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<PaginationParams>
}

const BoardsSuspense: NextPage<Props> = async ({
  params,
  searchParams,
}) => {
  const { id } = await params
  const { search } = await searchParams

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchInfiniteQuery(
    workspaceControllerListBoardsInfiniteQueryOptions(
      id,
      { search },
      { client }
    )
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceBoardList id={id} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = async (props) => {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <BoardsSuspense {...props} />
    </Suspense>
  )
}

export default Page
