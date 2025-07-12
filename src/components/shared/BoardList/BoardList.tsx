import Link from 'next/link'
import React from 'react'

import { BoardCreateForm } from '../BoardCreateForm'

import { Board, CreateBoardDto } from '@/api/generated'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  boards: Board[]
  workspaceId?: string
  withCreate?: { defaultValues: CreateBoardDto }
}

export const BoardList: React.FC<Props> = ({
  boards,
  workspaceId,
  withCreate,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {boards.map(({ id, title }) => (
          <Link
            key={id}
            className="rounded-xl bg-amber-100 p-4"
            href={`/board/${id}`}
          >
            {title}
          </Link>
        ))}
        {withCreate && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center justify-center rounded-xl bg-amber-100 p-4">
                Создать доску
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <BoardCreateForm
                defaultValues={withCreate.defaultValues}
                workspaceId={workspaceId}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}
