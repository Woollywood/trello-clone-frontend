'use client'

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React from 'react'

import { useBoardCtx } from '../../hooks/useBoardCtx'
import { useDragHandlers } from '../../hooks/useDragHandlers'
import { Column } from '../Column'
import { CreateColumn } from '../CreateColumn'
import { Overlay } from '../Overlay'

const createColumnKey = 'create-column'

export const Canvas: React.FC = () => {
  const { columns } = useBoardCtx()

  const { onDragStart, onDragOver, onDragEnd } = useDragHandlers()

  const hasColumns = columns && columns.length > 0

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  })
  const sensors = useSensors(pointerSensor)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={columns?.map(({ id }) => id) ?? []}>
        <div className="h-full w-full px-6 pb-24">
          <div className="flex h-full items-start gap-6">
            {!hasColumns ? (
              <CreateColumn key={createColumnKey} />
            ) : (
              <>
                {columns?.map((column) => (
                  <Column key={column.id} column={column} />
                ))}
                <CreateColumn key={createColumnKey} />
              </>
            )}
          </div>
        </div>
      </SortableContext>
      <Overlay />
    </DndContext>
  )
}
