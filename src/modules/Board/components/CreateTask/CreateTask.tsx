'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { useBoardCtx } from '../../hooks/useBoardCtx'

import { Schema, schema } from './schema'
import { ICreateTaskFormProps, ICreateTaskProps } from './types'

import {
  Board,
  boardControllerGetBoardQueryKey,
  boardControllerGetTasksQueryKey,
  Task,
  useBoardControllerCreateTask,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form, IFormRef } from '@/features/form/Form'
import { Textarea } from '@/features/form/Textarea'
import { Toggler } from '@/features/Toggler'
import { createConnectForm } from '@/hocs/createConnectForm'
import { useOutsideClick } from '@/hooks/useOutsideClick'

const ConnectForm = createConnectForm<Schema>()

const CreateForm: React.FC<ICreateTaskFormProps> = ({
  columnId,
  onCancel,
}) => {
  const { id: boardId } = useBoardCtx()
  const queryClient = useQueryClient()
  const { mutateAsync: createTask } = useBoardControllerCreateTask({
    mutation: {
      async onMutate({
        id,
        data: {
          board: { connect: boardConnect },
          column: { connect: columnConnect },
          title,
          description,
        },
      }) {
        await queryClient.cancelQueries({
          queryKey: boardControllerGetTasksQueryKey(id),
        })
        const prevState = queryClient.getQueryData(
          boardControllerGetTasksQueryKey(id)
        )

        queryClient.setQueryData<Board>(
          boardControllerGetBoardQueryKey(id),
          (old) => {
            if (!old) {
              return old
            }

            return {
              ...old,
              boardColumns: old.boardColumns?.map((column) =>
                column.id === columnConnect.id
                  ? {
                      ...column,
                      tasks: [
                        ...(column.tasks ?? []),
                        {
                          id: uuid(),
                          boardColumnId: columnConnect.id,
                          boardId: boardConnect.id,
                          title,
                          description,
                        } as Task,
                      ],
                    }
                  : column
              ),
            }
          }
        )

        return { prevState }
      },
      onError(error, { id }, context) {
        queryClient.setQueryData(
          boardControllerGetBoardQueryKey(id),
          context?.prevState
        )
      },
      onSettled(data, error, { id }) {
        queryClient.invalidateQueries({
          queryKey: boardControllerGetBoardQueryKey(id),
        })
      },
    },
  })

  const formRef = useRef<IFormRef<Schema>>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideClick([wrapperRef], onCancel)

  const onSubmit: SubmitHandler<Schema> = async ({ title }) => {
    formRef.current?.reset()
    await createTask({
      id: boardId,
      data: {
        title,
        board: { connect: { id: boardId } },
        column: { connect: { id: columnId } },
      },
    })
    formRef.current?.setFocus('title')
  }

  return (
    <div ref={wrapperRef}>
      <Form
        ref={formRef}
        className="space-y-2 px-4"
        useFormProps={{
          resolver: zodResolver(schema),
          defaultValues: {
            title: '',
          },
        }}
        onSubmit={onSubmit}
      >
        <ConnectForm>
          {({ control }) => (
            <Textarea
              autoFocus
              className="resize-none"
              control={control}
              name="title"
              placeholder="Введите название задачи"
            />
          )}
        </ConnectForm>
        <div className="flex items-center gap-2">
          <Button>Создать</Button>
          <Button variant="outline" onClick={onCancel}>
            <X />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const CreateTask: React.FC<ICreateTaskProps> = ({
  columnId,
  isOverlay = false,
}) => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <Toggler
      disabled={isOverlay}
      toggled={isToggled}
      toggle={setIsToggled}
      renderToggle={({ onToggle }) => (
        <CreateForm columnId={columnId} onCancel={onToggle} />
      )}
    >
      {({ onToggle }) => (
        <div className="pt-2">
          <Button className="w-full" onClick={onToggle}>
            Создать задачу
          </Button>
        </div>
      )}
    </Toggler>
  )
}
