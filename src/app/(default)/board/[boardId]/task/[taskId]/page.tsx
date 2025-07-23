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

import { boardControllerGetTaskQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { TaskDetails } from '@/modules/TaskDetails'

type Props = InferPagePropsType<RouteType>

const TaskSuspense: NextPage<Props> = async ({ routeParams }) => {
  const { taskId, boardId } = await routeParams

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchQuery(
    boardControllerGetTaskQueryOptions(boardId, taskId, { client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskDetails boardId={boardId} taskId={taskId} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = async (props) => {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <TaskSuspense {...props} />
    </Suspense>
  )
}

export default withParamValidation(Page, Route)
