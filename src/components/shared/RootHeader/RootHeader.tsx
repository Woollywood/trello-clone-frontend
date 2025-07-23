import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { Notifications } from './components/Notifications'
import { Profile } from './components/Profile'

import { notificationControllerCountNotificationsQueryOptions } from '@/api/generated'
import { createServerInstance } from '@/api/instances'

const RootHeaderSuspense: React.FC = async () => {
  const queryClient = new QueryClient()

  const client = await createServerInstance()
  await queryClient.prefetchQuery(
    notificationControllerCountNotificationsQueryOptions({ client })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center gap-4">
        <Notifications />
        <Profile />
      </div>
    </HydrationBoundary>
  )
}

export const RootHeader: React.FC = () => {
  return (
    <header className="h-header-height flex items-center justify-between px-6 py-4">
      <Link href="/">Лого</Link>
      <Suspense>
        <RootHeaderSuspense />
      </Suspense>
    </header>
  )
}
