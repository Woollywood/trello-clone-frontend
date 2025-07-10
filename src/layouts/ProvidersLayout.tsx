'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React from 'react'

import { Toaster } from '@/components/ui/sonner'
import { getQueryClient } from '@/libs/tanstackQuery'

export const ProvidersLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const queryClient = getQueryClient()

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
