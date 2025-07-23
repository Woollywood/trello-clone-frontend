'use client'

import React from 'react'

import { Canvas } from './components/Canvas/Canvas'
import { BoardProvider } from './context'

interface Props {
  id: string
}

export const Board: React.FC<Props> = ({ id }) => {
  return (
    <BoardProvider id={id}>
      <Canvas />
    </BoardProvider>
  )
}
