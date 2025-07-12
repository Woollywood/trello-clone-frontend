'use client'

import React from 'react'

import { useUserControllerListBoardsInfinite } from '@/api/generated'
import { BoardList } from '@/components/shared/BoardList/BoardList'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

export const UserBoards: React.FC = () => {
  const { search } = usePagination()
  const { data, isPending } = useUserControllerListBoardsInfinite({
    search,
  })

  if (!data || isPending) {
    return null
  }

  const boards = flatDataFromInfiniteQuery(data)

  return <BoardList boards={boards} />
}
