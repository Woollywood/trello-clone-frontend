'use client'

import React from 'react'

import {
  boardVisibilityEnum,
  useUserControllerListWorkspaceBoardsInfinite,
} from '@/api/generated'
import { BoardList } from '@/components/shared/BoardList/BoardList'
import TypedLink from '@/components/shared/TypedLink'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

export const UserWorkspaceBoards: React.FC = () => {
  const { search } = usePagination()
  const { data, isPending } =
    useUserControllerListWorkspaceBoardsInfinite({ search })

  if (!data || isPending) {
    return null
  }

  const workspaces = flatDataFromInfiniteQuery(data)

  return (
    <div className="space-y-8">
      {workspaces.map(({ id, title, boards }) => (
        <div key={id}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2>{title}</h2>
            <div className="flex items-center gap-2">
              <TypedLink
                href={{
                  route: '/dashboard/workspace/[id]/boards',
                  routeParams: { id },
                }}
              >
                Доски
              </TypedLink>
              <TypedLink
                href={{
                  route: '/dashboard/workspace/[id]/members',
                  routeParams: { id },
                }}
              >
                Участники
              </TypedLink>
              <TypedLink
                href={{
                  route: '/dashboard/workspace/[id]/settings',
                  routeParams: { id },
                }}
              >
                Настройки
              </TypedLink>
            </div>
          </div>
          <BoardList
            boards={boards ?? []}
            workspaceId={id}
            withCreate={{
              defaultValues: {
                title: '',
                visibility: boardVisibilityEnum.WORKSPACE,
              },
            }}
          />
        </div>
      ))}
    </div>
  )
}
