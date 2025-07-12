import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { Suspense } from 'react'

import { boardControllerGetBoardQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Board } from '@/modules/Board'

interface Props {
  params: Promise<{ id: string }>
}

const BoardSuspense: NextPage<Props> = async ({ params }) => {
  const { id } = await params

  const queryClient = new QueryClient()
  const client = await createServerInstance()

  await queryClient.prefetchQuery(
    boardControllerGetBoardQueryOptions(id, { client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Board id={id} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = (props) => {
  return (
    <Suspense>
      <BoardSuspense {...props} />
    </Suspense>
  )
}

export default Page
