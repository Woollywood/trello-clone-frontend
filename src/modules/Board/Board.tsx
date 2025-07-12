'use client'

import React from 'react'

import { useBoardControllerGetBoard } from '@/api/generated'

interface Props {
  id: string
}

export const Board: React.FC<Props> = ({ id }) => {
  const { data, isPending } = useBoardControllerGetBoard(id)

  if (!data || isPending) {
    return null
  }

  console.log(data.boardColumns)

  return <div>Board</div>
}
