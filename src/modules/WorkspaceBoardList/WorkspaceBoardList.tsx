'use client'

import React from 'react'

import {
  boardVisibilityEnum,
  useWorkspaceControllerListBoardsInfinite,
} from '@/api/generated'
import { BoardList } from '@/components/shared/BoardList/BoardList'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

interface Props {
  id: string
}

export const WorkspaceBoardList: React.FC<Props> = ({ id }) => {
  const { search } = usePagination()
  const { data, isPending } =
    useWorkspaceControllerListBoardsInfinite(id, { search })

  if (!data || isPending) {
    return null
  }

  const boards = flatDataFromInfiniteQuery(data)

  return (
    <BoardList
      withCreate={{
        defaultValues: {
          title: '',
          visibility: boardVisibilityEnum.WORKSPACE,
        },
      }}
      workspaceId={id}
      boards={boards}
    />
  )
}
