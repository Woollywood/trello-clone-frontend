import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash-es'

import { BoardColumn, Task } from '@/api/generated'

export const reorderTasksOverColumns = (
  columns: BoardColumn[],
  { activeTask, destColId }: { activeTask: Task; destColId: string }
) =>
  columns
    .map((column) => ({
      ...column,
      tasks: column.tasks?.filter(({ id }) => id !== activeTask.id),
    }))
    .reduce<BoardColumn[]>((acc, column) => {
      if (column.id === destColId) {
        const copyTask = cloneDeep(activeTask)
        copyTask.boardColumnId = destColId
        return [
          ...acc,
          {
            ...column,
            tasks: [...(column.tasks ?? []), copyTask],
          },
        ]
      } else {
        return [...acc, column]
      }
    }, [])

export const reorderTaskInColumn = (
  column: BoardColumn,
  { srcId, destId }: { srcId: string; destId: string }
): BoardColumn => {
  const srcIdx =
    column.tasks?.findIndex(({ id }) => srcId === id) ?? -1
  const destIdx =
    column.tasks?.findIndex(({ id }) => destId === id) ?? -1
  return {
    ...column,
    tasks: arrayMove(column.tasks ?? [], srcIdx, destIdx),
  }
}
