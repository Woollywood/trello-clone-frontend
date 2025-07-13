'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'

import { Schema, schema } from './schema'
import { Props } from './types'

import {
  boardControllerGetBoardQueryKey,
  useBoardControllerGetTask,
  useBoardControllerUpdateTask,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Textarea } from '@/features/form/Textarea'
import { createConnectForm } from '@/hocs/createConnectForm'

const ConnectForm = createConnectForm<Schema>()

export const TaskDetails: React.FC<Props> = ({ taskId, boardId }) => {
  const { data, isPending } = useBoardControllerGetTask(
    boardId,
    taskId
  )

  const queryClient = useQueryClient()
  const { mutateAsync } = useBoardControllerUpdateTask({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: boardControllerGetBoardQueryKey(boardId),
        })
      },
    },
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await mutateAsync({ id: boardId, taskId, data })
  }

  if (!data || isPending) {
    return null
  }

  return (
    <div>
      <Form
        className="space-y-6"
        useFormProps={{
          resolver: zodResolver(schema),
          defaultValues: {
            title: data.title,
            description: data.description ?? '',
          },
        }}
        onSubmit={onSubmit}
      >
        <ConnectForm>
          {({ control }) => (
            <Textarea
              control={control}
              name="title"
              label="Название"
            />
          )}
        </ConnectForm>
        <ConnectForm>
          {({ control }) => (
            <Textarea
              control={control}
              name="description"
              label="Описание"
            />
          )}
        </ConnectForm>
        <ConnectForm>
          {({ formState: { isDirty } }) =>
            isDirty && <Button>Сохранить</Button>
          }
        </ConnectForm>
      </Form>
    </div>
  )
}
