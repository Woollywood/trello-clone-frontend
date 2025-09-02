import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Home, LayoutTemplate, Table2 } from 'lucide-react'
import { NextPage } from 'next'
import { AllRoutes } from 'next-typesafe-url'
import React, { Suspense } from 'react'

import { SidebarLink } from './components/SidebarLink'
import { WorkspaceList } from './components/WorkspaceList'
import { ISidebarLink } from './types'

import { userControllerFindWorkSpacesQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Separator } from '@/components/ui/separator'

const links: ISidebarLink<AllRoutes>[] = [
  {
    label: 'Доски',
    href: { route: '/dashboard/boards' },
    icon: <Table2 className="mx-2 h-4 w-4" />,
  },
  {
    label: 'Шаблоны',
    href: { route: '/dashboard/templates' },
    icon: <LayoutTemplate className="mx-2 h-4 w-4" />,
  },
  {
    label: 'Главная',
    href: { route: '/dashboard/main' },
    icon: <Home className="mx-2 h-4 w-4" />,
  },
]

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
        {links.map((link) => (
          <li key={link.href.route}>
            <SidebarLink {...link} />
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
