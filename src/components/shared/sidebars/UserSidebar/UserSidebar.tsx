import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { WorkspaceList } from './components/WorkspaceList'

import { userControllerFindWorkSpacesQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'
import { Separator } from '@/components/ui/separator'

interface ISidebarLink {
  label: string
  href: string
}

const links: ISidebarLink[] = [
  {
    label: 'Boards',
    href: '/user/boards',
  },
  {
    label: 'Main',
    href: '/user/main',
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
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
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
