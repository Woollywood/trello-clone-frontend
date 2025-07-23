'use client'

import React, { useMemo, useState } from 'react'

import { BoardCtx } from './context'
import { IBoardContext } from './types'

import {
  BoardColumn,
  Task,
  useBoardControllerGetBoard,
} from '@/api/generated'

export const BoardProvider: React.FC<
  React.PropsWithChildren & Pick<IBoardContext, 'id'>
> = ({ id, children }) => {
  const { data: board, isPending: isPendingBoard } =
    useBoardControllerGetBoard(id)

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeColumn, setActiveColumn] =
    useState<BoardColumn | null>(null)

  const [localColumns, setLocalColumns] = useState<
    BoardColumn[] | null
  >(null)

  const columns = useMemo(
    () => localColumns ?? board?.boardColumns ?? [],
    [board, localColumns]
  )

  const tasks = useMemo(
    () =>
      columns.reduce<Task[]>(
        (acc, { tasks }) => [...acc, ...(tasks ?? [])],
        []
      ) ?? [],
    [columns]
  )

  const value: IBoardContext = useMemo(
    () => ({
      id,

      board,
      isPendingBoard,

      columns,
      tasks,
      setLocalColumns,

      activeTask,
      activeColumn,
      setActiveTask,
      setActiveColumn,
    }),
    [
      id,
      board,
      isPendingBoard,
      columns,
      tasks,
      activeTask,
      activeColumn,
    ]
  )

  return (
    <BoardCtx.Provider value={value}>{children}</BoardCtx.Provider>
  )
}
