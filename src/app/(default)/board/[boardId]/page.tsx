import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import React, { Suspense } from 'react'

import { boardControllerGetBoardQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Board } from '@/modules/Board'

interface Props {
  params: Promise<{ boardId: string }>
}

const BoardSuspense: NextPage<Props> = async ({ params }) => {
  const { boardId } = await params

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

export default Page
