import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { withParamValidation } from 'next-typesafe-url/app/hoc'
import React, { Suspense } from 'react'

import { Route, RouteType } from './routeType'

import { boardControllerGetBoardQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Board } from '@/modules/Board'

type Props = InferPagePropsType<RouteType>

const BoardSuspense: NextPage<Props> = async ({ routeParams }) => {
  const { boardId } = await routeParams

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchQuery(
    boardControllerGetBoardQueryOptions(boardId, { client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Board id={boardId} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = ({ ...props }) => {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <BoardSuspense {...props} />
    </Suspense>
  )
}

export default withParamValidation(Page, Route)
