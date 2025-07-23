import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { useCallback } from 'react'

import { reorderTasksOverColumns } from '../helpers/reorderTasks'

import { useBoardCtx } from './useBoardCtx'
import { useColumnHandlers } from './useColumnHandlers'
import { useTaskHandlers } from './useTaskHandlers'

import { BoardColumn, Task } from '@/api/generated'

export const useDragHandlers = () => {
  const {
    id,
    columns,
    tasks,
    activeTask,
    setActiveColumn,
    setActiveTask,
    setLocalColumns,
  } = useBoardCtx()

  const { swapColumns } = useColumnHandlers()
  const { swapTasksOverColumns, swapTasksInColumn } =
    useTaskHandlers()

  const resetState = useCallback(() => {
    setActiveTask(null)
    setActiveColumn(null)
    setLocalColumns(null)
  }, [setActiveColumn, setActiveTask, setLocalColumns])

  const onDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      if (active.data.current?.type) {
        const type = active.data.current.type
        switch (type) {
          case 'column':
            {
              const activeColumn = columns.find(
                ({ id }) => id === active.id
              )
              if (activeColumn) {
                setActiveColumn(activeColumn)
              }
            }
            break
          case 'task':
            {
              const activeTask = tasks.find(
                ({ id }) => id === active.id
              )
              if (activeTask) {
                setActiveTask(activeTask)
              }
            }
            break
        }
      }
    },
    [columns, setActiveColumn, setActiveTask, tasks]
  )

  const onDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over) {
        return
      }

      if (active.id === over.id) {
        return
      }

      if (!activeTask) {
        return
      }

      const overType = over.data.current?.type
      switch (overType) {
        case 'task':
          {
            const overTask = over.data.current?.task as Task
            if (activeTask.boardColumnId === overTask.boardColumnId) {
              setLocalColumns(null)
            } else {
              setLocalColumns(
                reorderTasksOverColumns(columns, {
                  activeTask,
                  destColId: overTask.boardColumnId,
                })
              )
            }
          }
          break
        case 'column':
          {
            const overColumn = over.data.current
              ?.column as BoardColumn
            if (activeTask.boardColumnId === overColumn.id) {
              setLocalColumns(null)
            } else {
              setLocalColumns(
                reorderTasksOverColumns(columns, {
                  activeTask,
                  destColId: overColumn.id,
                })
              )
            }
          }
          break
      }
    },
    [activeTask, columns, setLocalColumns]
  )

  const onDragEnd = useCallback(
    async ({ active, over }: DragEndEvent) => {
      if (!over) {
        return resetState()
      }

      const activeType = active.data.current?.type
      const overType = over.data.current?.type
      const isOverColumn = overType === 'column'
      const overColumnId = isOverColumn
        ? (over.data.current?.column as BoardColumn).id
        : (over.data.current?.task as Task).boardColumnId

      if (
        active.id === over.id &&
        activeTask?.boardColumnId === overColumnId
      ) {
        return resetState()
      }

      switch (activeType) {
        case 'column':
          {
            const activeColumn = active.data.current
              ?.column as BoardColumn
            await swapColumns({
              id,
              data: {
                srcId: activeColumn.id,
                destId: overColumnId,
              },
            })
          }
          break
        case 'task':
          switch (overType) {
            case 'column':
              await swapTasksOverColumns({
                destColumnId: overColumnId,
              })
              break
            case 'task':
              {
                if (activeTask) {
                  const overTask = over.data.current?.task as Task
                  if (activeTask.id === overTask.id) {
                    await swapTasksOverColumns({
                      destColumnId: overColumnId,
                    })
                  } else {
                    await swapTasksInColumn({
                      srcId: activeTask.id,
                      destId: overTask.id,
                      destColumnId: overTask.boardColumnId,
                    })
                  }
                }
              }
              break
          }
          break
      }

      return resetState()
    },
    [
      activeTask,
      id,
      resetState,
      swapColumns,
      swapTasksInColumn,
      swapTasksOverColumns,
    ]
  )

  return { onDragStart, onDragOver, onDragEnd }
}
