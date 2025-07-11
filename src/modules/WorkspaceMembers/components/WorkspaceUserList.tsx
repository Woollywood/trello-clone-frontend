'use client'

import { NextPage } from 'next'
import React from 'react'

import { WorkspaceUser } from './WorkspaceUser'

import { useWorkspaceControllerListUsersInfinite } from '@/api/generated'
import { useEventListener } from '@/features/websocket'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

interface Props {
  id: string
}

export const WorkspaceUserList: NextPage<Props> = ({ id }) => {
  const { search } = usePagination()
  const { data, isPending, refetch } =
    useWorkspaceControllerListUsersInfinite(id, { search })

  useEventListener('notifications/recipient/action', () => {
    refetch()
  })

  if (isPending || !data) {
    return null
  }

  const flattenData = flatDataFromInfiniteQuery(data)

  return (
    <div className="space-y-4">
      {flattenData.map((user) => (
        <WorkspaceUser key={user.id} workspaceId={id} user={user} />
      ))}
    </div>
  )
}
