import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { reorderColumns } from '../helpers/reorderColumns'

import { useBoardCtx } from './useBoardCtx'

import {
  Board,
  boardControllerGetBoardQueryKey,
  BoardControllerSwapColumnsMutationRequest,
  BoardControllerSwapColumnsPathParams,
  useBoardControllerSwapColumns,
} from '@/api/generated'

export const useColumnHandlers = () => {
  const queryClient = useQueryClient()
  const { board, setLocalColumns } = useBoardCtx()

  const { mutateAsync } = useBoardControllerSwapColumns({
    mutation: {
      async onMutate({ id, data: { srcId, destId } }) {
        await queryClient.cancelQueries({
          queryKey: boardControllerGetBoardQueryKey(id),
        })
        const prevState = queryClient.getQueryData(
          boardControllerGetBoardQueryKey(id)
        )

        queryClient.setQueryData<Board>(
          boardControllerGetBoardQueryKey(id),
          (old) => {
            if (!old || !board) {
              return old
            }

            return {
              ...old,
              boardColumns: reorderColumns(board, { srcId, destId }),
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

  const swapColumns = useCallback(
    async (data: {
      id: BoardControllerSwapColumnsPathParams['id']
      data: BoardControllerSwapColumnsMutationRequest
    }) => {
      if (board) {
        setLocalColumns(reorderColumns(board, data.data))
        await mutateAsync(data)
        setLocalColumns(null)
      }
    },
    [board, mutateAsync, setLocalColumns]
  )

  return {
    swapColumns,
  }
}
