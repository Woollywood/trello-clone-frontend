'use client'

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import React, { CSSProperties } from 'react'

import { useBoardCtx } from '../../hooks/useBoardCtx'
import { useColumn } from '../../hooks/useColumn'
import { CreateTask } from '../CreateTask'
import { Task } from '../Task'

import { IColumnProps } from './types'

import {
  Board,
  boardControllerGetBoardQueryKey,
  useBoardControllerDeleteColumn,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/helpers'

export const Column: React.FC<IColumnProps> = ({
  column,
  isOverlay = false,
}) => {
  const { id, title } = column

  const { id: boardId } = useBoardCtx()

  const { setNodeRef, isDragging, listeners, transform, transition } =
    useSortable({
      id,
      disabled: isOverlay,
      data: { type: 'column', column },
    })
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  const { tasks, tasksIds } = useColumn(column.id)

  const queryClient = useQueryClient()
  const { mutateAsync: deleteColumn } =
    useBoardControllerDeleteColumn({
      mutation: {
        async onMutate({ id, columnId }) {
          await queryClient.cancelQueries({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
          const prevState = queryClient.getQueryData(
            boardControllerGetBoardQueryKey(id)
          )

          queryClient.setQueryData<Board>(
            boardControllerGetBoardQueryKey(id),
            (old) => {
              if (!old) {
                return old
              }

              return {
                ...old,
                boardColumns: old.boardColumns?.filter(
                  (column) => column.id !== columnId
                ),
              }
            }
          )

          return { prevState }
        },
        onError(error, { id }, context) {
          queryClient.setQueryData(
            boardControllerGetBoardQueryKey(id),
            context?.prevState
          )
        },
        onSettled(data, error, { id }) {
          queryClient.invalidateQueries({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
        },
      },
    })

  return (
    <SortableContext items={tasksIds}>
      <div ref={setNodeRef} className="h-full">
        <div
          style={style}
          className={cn(
            'grid h-full w-[260px] grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-black bg-white',
            { 'opacity-40': isDragging, 'rotate-6': isOverlay }
          )}
        >
          <div
            className="flex items-center justify-between gap-2 px-4 py-2"
            {...listeners}
          >
            <p>{title}</p>
            <Button
              disabled={isOverlay}
              variant="ghost"
              onClick={() =>
                deleteColumn({ id: boardId, columnId: id })
              }
            >
              <Trash />
            </Button>
          </div>
          <div
            className={cn('h-full overflow-y-auto', {
              'overflow-hidden': isOverlay,
            })}
          >
            <div className="space-y-2 px-4 py-2">
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  isOverlay={isOverlay}
                />
              ))}
            </div>
          </div>
          <CreateTask columnId={id} isOverlay={isOverlay} />
        </div>
      </div>
    </SortableContext>
  )
}
