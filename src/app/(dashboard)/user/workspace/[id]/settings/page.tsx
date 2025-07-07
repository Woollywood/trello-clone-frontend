import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { Suspense } from 'react'

import { workspaceControllerFindWorkspaceQueryOptions } from '@/api/generated'
import { WorkspaceSettings } from '@/modules/WorkspaceSettings'
import { apiInstance } from '@/utils/helpers'

interface Props {
  params: Promise<{ id: string }>
}

const WorkspaceSuspense: NextPage<{ id: string }> = async ({
  id,
}) => {
  const queryClient = new QueryClient()
  const client = apiInstance.serverInstance
  await queryClient.prefetchQuery(
    workspaceControllerFindWorkspaceQueryOptions(id, { client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceSettings id={id} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params

  return (
    <Suspense fallback={<p>Загрузка</p>}>
      <WorkspaceSuspense id={id} />
    </Suspense>
  )
}

export default Page
