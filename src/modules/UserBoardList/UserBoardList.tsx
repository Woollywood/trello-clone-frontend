import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { Suspense } from 'react'

import { UserWorkspaceBoards } from './components'
import { UserBoards } from './components'

import {
  userControllerListBoardsInfiniteQueryOptions,
  userControllerListWorkspaceBoardsInfiniteQueryOptions,
} from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { SearchRouteType } from '@/utils/constants'

type Props = InferPagePropsType<SearchRouteType>

const UserBoardsSuspense: NextPage<Props> = async ({
  searchParams,
}) => {
  const { search } = await searchParams

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchInfiniteQuery(
    userControllerListBoardsInfiniteQueryOptions(
      { search },
      { client }
    )
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserBoards />
    </HydrationBoundary>
  )
}

const UserWorkspaceBoardsSuspense: NextPage<Props> = async ({
  searchParams,
}) => {
  const { search } = await searchParams

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchInfiniteQuery(
    userControllerListWorkspaceBoardsInfiniteQueryOptions(
      { search },
      { client }
    )
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserWorkspaceBoards />
    </HydrationBoundary>
  )
}

export const UserBoardList: NextPage<Props> = (props) => {
  return (
    <div className="space-y-12">
      <Suspense fallback={<p>Загрузка</p>}>
        <UserBoardsSuspense {...props} />
      </Suspense>
      <Suspense fallback={<p>Загрузка</p>}>
        <UserWorkspaceBoardsSuspense {...props} />
      </Suspense>
    </div>
  )
}
