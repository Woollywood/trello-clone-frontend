'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import React, { CSSProperties } from 'react'

import { useBoardCtx } from '../../hooks/useBoardCtx'

import { ITaskProps } from './types'

import {
  Board,
  boardControllerGetBoardQueryKey,
  useBoardControllerDeleteTask,
} from '@/api/generated'
import TypedLink from '@/components/shared/TypedLink'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/helpers'

export const Task: React.FC<ITaskProps> = ({
  task,
  isOverlay = false,
}) => {
  const { id, title } = task

  const { id: boardId, activeTask } = useBoardCtx()

  const { setNodeRef, isDragging, listeners, transform, transition } =
    useSortable({
      id,
      disabled: isOverlay,
      data: { type: 'task', task },
    })
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  console.log('task render')

  const queryClient = useQueryClient()
  const { mutateAsync: deleteTask } = useBoardControllerDeleteTask({
    mutation: {
      async onMutate({ id, taskId }) {
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
              boardColumns: old.boardColumns?.map((column) => ({
                ...column,
                tasks: column.tasks?.some(({ id }) => id === taskId)
                  ? column.tasks.filter(({ id }) => id !== taskId)
                  : column.tasks,
              })),
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
    <TypedLink
      href={{
        route: '/board/[boardId]/task/[taskId]',
        routeParams: { boardId, taskId: id },
      }}
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center justify-between gap-2 rounded-xl border border-black bg-white px-4 py-2',
        {
          'opacity-40': isDragging,
          'rotate-6': isOverlay && activeTask,
        }
      )}
      {...listeners}
    >
      <span>{title}</span>
      <Button
        disabled={isOverlay}
        variant="ghost"
        onClick={() => deleteTask({ id: boardId, taskId: id })}
      >
        <Trash />
      </Button>
    </TypedLink>
  )
}
