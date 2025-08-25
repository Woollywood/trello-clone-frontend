import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { AllRoutes, PathOptions } from 'next-typesafe-url'
import React, { Suspense } from 'react'

import TypedLink from '../../TypedLink'

import { WorkspaceList } from './components/WorkspaceList'

import { userControllerFindWorkSpacesQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Separator } from '@/components/ui/separator'

interface ISidebarLink<T extends AllRoutes> {
  label: string
  href: PathOptions<T>
}

const links: ISidebarLink<AllRoutes>[] = [
  {
    label: 'Доски',
    href: { route: '/dashboard/boards' },
  },
  {
    label: 'Главная',
    href: { route: '/dashboard/main' },
  },
]

console.log('hi');


const WorkspaceListSuspense: NextPage<
  React.PropsWithChildren
> = async ({ children }) => {
  const queryClient = new QueryClient()

  const client = await createServerInstance()
  await queryClient.prefetchQuery(
    userControllerFindWorkSpacesQueryOptions(undefined, {
      client,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export const UserSidebar: NextPage = () => {
  return (
    <div>
      <ul>
        {links.map(({ label, href }) => (
          <li key={href.route}>
            <TypedLink href={href}>{label}</TypedLink>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
      <Suspense fallback={<p>Загрузка...</p>}>
        <WorkspaceListSuspense>
          <WorkspaceList />
        </WorkspaceListSuspense>
      </Suspense>
    </div>
  )
}
