'use client'

import { DragOverlay } from '@dnd-kit/core'
import { isServer } from '@tanstack/react-query'
import React from 'react'
import { createPortal } from 'react-dom'

import { useBoardCtx } from '../../hooks/useBoardCtx'
import { Column } from '../Column'
import { Task } from '../Task'

export const Overlay: React.FC = () => {
  const { activeTask, activeColumn } = useBoardCtx()

  if (isServer) {
    return null
  }

  return createPortal(
    <DragOverlay>
      {activeTask && <Task isOverlay task={activeTask} />}
      {activeColumn && <Column isOverlay column={activeColumn} />}
    </DragOverlay>,
    document.body
  )
}
