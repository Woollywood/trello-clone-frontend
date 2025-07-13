'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import {
  boardControllerGetBoardQueryKey,
  Task as TaskEntity,
  useBoardControllerDeleteTask,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

export const Task: React.FC<TaskEntity> = ({ id, title }) => {
  const { push } = useRouter()
  const { boardId } = useParams<{ boardId: string }>()

  const queryClient = useQueryClient()
  const { mutateAsync: deleteTask, isPending } =
    useBoardControllerDeleteTask({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: boardControllerGetBoardQueryKey(boardId),
          })
        },
      },
    })

  const onDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    await deleteTask({ id: boardId, taskId: id })
  }

  const onNavigate = () => {
    push(`/board/${boardId}/task/${id}`)
  }

  return (
    <div
      className="flex cursor-pointer items-start justify-between gap-2 rounded-xl bg-slate-700 px-4 py-2"
      onClick={onNavigate}
    >
      {title}
      <Button disabled={isPending} variant="ghost" onClick={onDelete}>
        <Trash />
      </Button>
    </div>
  )
}
