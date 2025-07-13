'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

import { Schema, schema } from './schema'
import { Props } from './types'

import {
  boardControllerGetBoardQueryKey,
  useBoardControllerCreateColumn,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Textarea } from '@/features/form/Textarea'
import { Toggler } from '@/features/Toggler'
import { createConnectForm } from '@/hocs/createConnectForm'

const ConnectForm = createConnectForm<Schema>()

export const CreateColumn: React.FC<Props> = ({
  boardId,
  placeholder,
}) => {
  const [isToggled, setIsToggled] = useState(false)

  const queryClient = useQueryClient()
  const { mutateAsync } = useBoardControllerCreateColumn({
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
          className="w-3xs space-y-6"
          useFormProps={{
            resolver: zodResolver(schema),
            defaultValues: {
              title: '',
            },
          }}
          onSubmit={async ({ title }) =>
            mutateAsync({
              id: boardId,
              data: { title, board: { connect: { id: boardId } } },
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
                placeholder="Введите имя колонки"
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
        <Button onClick={onToggle}>{placeholder}</Button>
      )}
    </Toggler>
  )
}
