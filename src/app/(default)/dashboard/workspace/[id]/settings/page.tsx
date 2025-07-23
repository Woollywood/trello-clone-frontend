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

import { workspaceControllerFindWorkspaceQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { WorkspaceSettings } from '@/modules/WorkspaceSettings'

type Props = InferPagePropsType<RouteType>

const WorkspaceSuspense: NextPage<{ id: string }> = async ({
  id,
}) => {
  const queryClient = new QueryClient()
  const client = await createServerInstance()
  await queryClient.prefetchQuery(
    workspaceControllerFindWorkspaceQueryOptions(id, { client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceSettings id={id} />
    </HydrationBoundary>
  )
}

const Page: NextPage<Props> = async ({ routeParams }) => {
  const { id } = await routeParams

  return (
    <Suspense fallback={<p>Загрузка</p>}>
      <WorkspaceSuspense id={id} />
    </Suspense>
  )
}

export default withParamValidation(Page, Route)
