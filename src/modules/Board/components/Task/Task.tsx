'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

import { Task as TaskEntity } from '@/api/generated'

export const Task: React.FC<TaskEntity> = ({ id, title }) => {
  const { boardId } = useParams<{ boardId: string }>()

  return (
    <Link
      href={`/board/${boardId}/task/${id}`}
      className="block rounded-xl bg-slate-700 px-4 py-2"
    >
      {title}
    </Link>
  )
}
