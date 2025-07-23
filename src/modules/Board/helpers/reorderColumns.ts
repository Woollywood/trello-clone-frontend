import { arrayMove } from '@dnd-kit/sortable'

import {
  Board,
  BoardControllerSwapColumnsMutationRequest,
} from '@/api/generated'

export const reorderColumns = (
  board: Board,
  { srcId, destId }: BoardControllerSwapColumnsMutationRequest
) => {
  const srcIdx =
    board?.boardColumns?.findIndex(({ id }) => id === srcId) ?? -1
  const destIdx =
    board?.boardColumns?.findIndex(({ id }) => id === destId) ?? -1
  return arrayMove(board?.boardColumns ?? [], srcIdx, destIdx)
}
