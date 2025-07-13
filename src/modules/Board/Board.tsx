'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import React from 'react'

import { CreateColumn, CreateTask, Task } from './components'

import {
  boardControllerGetBoardQueryKey,
  useBoardControllerDeleteColumn,
  useBoardControllerGetBoard,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

interface Props {
  id: string
}

export const Board: React.FC<Props> = ({ id }) => {
  const { data, isPending: isPendingBoards } =
    useBoardControllerGetBoard(id)

  const queryClient = useQueryClient()
  const { mutateAsync: deleteColumn, isPending: isPendingDelete } =
    useBoardControllerDeleteColumn({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
        },
      },
    })

  const onDelete = async (columnId: string) => {
    await deleteColumn({ id, columnId })
  }

  if (!data || isPendingBoards) {
    return null
  }

  const columns = data.boardColumns ?? []
  const hasColumns = columns.length > 0

  return (
    <div className="relative size-full">
      <div className="absolute top-0 right-0 left-0 size-full">
        <div className="flex h-full items-start gap-4 overflow-auto px-6">
          {!hasColumns ? (
            <CreateColumn
              boardId={id}
              placeholder="Добавить список"
            />
          ) : (
            <>
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="w-3xs min-w-3xs rounded-xl bg-black p-2 text-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="mb-6 text-xl font-medium break-words">
                      {column.title}
                    </p>
                    <Button
                      disabled={isPendingDelete}
                      variant="ghost"
                      onClick={() => onDelete(column.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {column.tasks?.map((task) => (
                      <Task key={task.id} {...task} />
                    ))}
                  </div>
                  <div className="pt-2">
                    <CreateTask boardId={id} column={column} />
                  </div>
                </div>
              ))}
              <CreateColumn
                boardId={id}
                placeholder="Добавить ещё одну колонку"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
