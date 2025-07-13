'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import { useBoardControllerGetTask } from '@/api/generated'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { TaskDetails } from '@/modules/TaskDetails'

const Page: React.FC = () => {
  const { back } = useRouter()
  const { boardId, taskId } = useParams<{
    boardId: string
    taskId: string
  }>()

  const { isPending } = useBoardControllerGetTask(boardId, taskId)

  return (
    <Dialog defaultOpen onOpenChange={back}>
      <DialogContent className="py-12">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Детальная информация о карточке</DialogTitle>
            <DialogDescription>
              Детальная информация о карточке
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {isPending ? (
          <p>Загрузка...</p>
        ) : (
          <TaskDetails boardId={boardId} taskId={taskId} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Page
