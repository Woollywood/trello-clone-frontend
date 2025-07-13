import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { Suspense } from 'react'

import { boardControllerGetTaskQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { TaskDetails } from '@/modules/TaskDetails'

interface Props {
  params: Promise<{ boardId: string; taskId: string }>
}

const TaskSuspense: NextPage<Props> = async ({ params }) => {
  const { taskId, boardId } = await params

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

export default Page
