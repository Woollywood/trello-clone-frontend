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

import { workspaceControllerListBoardsInfiniteQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { WorkspaceBoardList } from '@/modules/WorkspaceBoardList'

type Props = InferPagePropsType<RouteType>

const BoardsSuspense: NextPage<Props> = async ({
  routeParams,
  searchParams,
}) => {
  const { id } = await routeParams
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

export default withParamValidation(Page, Route)
