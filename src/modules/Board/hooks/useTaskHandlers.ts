import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import {
  reorderTaskInColumn,
  reorderTasksOverColumns,
} from '../helpers/reorderTasks'

import { useBoardCtx } from './useBoardCtx'

import {
  Board,
  BoardColumn,
  boardControllerGetBoardQueryKey,
  useBoardControllerSwapTasks,
} from '@/api/generated'

export const useTaskHandlers = () => {
  const queryClient = useQueryClient()
  const { id, activeTask, columns, setLocalColumns } = useBoardCtx()

  const reorderTaskHelper = useCallback(
    ({
      srcId,
      destId,
      destColumnId,
    }: {
      srcId: string
      destId: string
      destColumnId: string
    }) => {
      return columns.reduce<BoardColumn[]>(
        (acc, column) => [
          ...acc,
          column.id === destColumnId
            ? reorderTaskInColumn(column, { srcId, destId })
            : column,
        ],
        []
      )
    },
    [columns]
  )

  const { mutateAsync } = useBoardControllerSwapTasks({
    mutation: {
      async onMutate({ id }) {
        await queryClient.cancelQueries({
          queryKey: boardControllerGetBoardQueryKey(id),
        })
        const prevState = queryClient.getQueryData<Board>(
          boardControllerGetBoardQueryKey(id)
        )

        if (activeTask) {
          queryClient.setQueryData<Board>(
            boardControllerGetBoardQueryKey(id),
            (old) => {
              if (!old) {
                return old
              }

              return {
                ...old,
                boardColumns: columns,
              }
            }
          )
        }

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

  const swapTasksOverColumns = useCallback(
    async ({ destColumnId }: { destColumnId: string }) => {
      if (activeTask) {
        setLocalColumns(
          reorderTasksOverColumns(columns, {
            activeTask,
            destColId: destColumnId,
          })
        )

        await mutateAsync({
          id,
          data: { srcId: activeTask.id, destColumnId },
        })

        setLocalColumns(null)
      }
    },
    [activeTask, columns, id, mutateAsync, setLocalColumns]
  )
  const swapTasksInColumn = useCallback(
    async ({
      srcId,
      destId,
      destColumnId,
    }: {
      srcId: string
      destId: string
      destColumnId: string
    }) => {
      if (activeTask) {
        setLocalColumns(
          reorderTaskHelper({
            srcId,
            destId,
            destColumnId,
          })
        )
        await mutateAsync({
          id,
          data: { srcId: activeTask.id, destColumnId, destId },
        })

        setLocalColumns(null)
      }
    },
    [activeTask, id, mutateAsync, reorderTaskHelper, setLocalColumns]
  )

  return { swapTasksOverColumns, swapTasksInColumn }
}
