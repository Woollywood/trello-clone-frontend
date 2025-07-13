'use client'

import React from 'react'

import { CreateColumn, CreateTask, Task } from './components'

import { useBoardControllerGetBoard } from '@/api/generated'

interface Props {
  id: string
}

export const Board: React.FC<Props> = ({ id }) => {
  const { data, isPending } = useBoardControllerGetBoard(id)

  if (!data || isPending) {
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
                  <p className="mb-6 text-xl font-medium break-words">
                    {column.title}
                  </p>
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
