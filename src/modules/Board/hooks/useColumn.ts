import { useMemo } from 'react'

import { useBoardCtx } from './useBoardCtx'

export const useColumn = (columnId: string) => {
  const { columns } = useBoardCtx()

  const tasks = useMemo(
    () => columns.find(({ id }) => id === columnId)?.tasks ?? [],
    [columnId, columns]
  )
  const tasksIds = useMemo(() => tasks.map(({ id }) => id), [tasks])

  return { tasks, tasksIds }
}
