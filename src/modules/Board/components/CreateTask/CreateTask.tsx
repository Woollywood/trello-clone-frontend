'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

import { Schema, schema } from './schema'
import { Props } from './types'

import {
  boardControllerGetBoardQueryKey,
  useBoardControllerCreateTask,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Textarea } from '@/features/form/Textarea'
import { Toggler } from '@/features/Toggler'
import { createConnectForm } from '@/hocs/createConnectForm'

const ConnectForm = createConnectForm<Schema>()

export const CreateTask: React.FC<Props> = ({ boardId, column }) => {
  const [isToggled, setIsToggled] = useState(false)

  const queryClient = useQueryClient()
  const { mutateAsync } = useBoardControllerCreateTask({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: boardControllerGetBoardQueryKey(boardId),
        })
        setIsToggled(false)
      },
    },
  })

  return (
    <Toggler
      toggled={isToggled}
      toggle={setIsToggled}
      renderToggle={({ onToggle }) => (
        <Form
          className="space-y-2"
          useFormProps={{
            resolver: zodResolver(schema),
            defaultValues: {
              title: '',
            },
          }}
          onSubmit={async ({ title }) =>
            mutateAsync({
              id: boardId,
              data: { title, column: { connect: { id: column.id } } },
            })
          }
        >
          <ConnectForm>
            {({ control }) => (
              <Textarea
                className="resize-none"
                rows={1}
                control={control}
                name="title"
                placeholder="Введите название"
                autoFocus
              />
            )}
          </ConnectForm>
          <div className="flex items-center gap-2">
            <ConnectForm>
              {({ formState: { isSubmitting } }) => (
                <Button disabled={isSubmitting}>Создать</Button>
              )}
            </ConnectForm>
            <ConnectForm>
              {({ formState: { isSubmitting } }) => (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onToggle}
                >
                  Отменить
                </Button>
              )}
            </ConnectForm>
          </div>
        </Form>
      )}
    >
      {({ onToggle }) => (
        <Button className="w-full" onClick={onToggle}>
          Добавить карточку
        </Button>
      )}
    </Toggler>
  )
}
