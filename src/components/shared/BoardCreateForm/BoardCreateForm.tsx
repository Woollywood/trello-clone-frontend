'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'

import { Schema, schema } from './schema'

import {
  boardVisibilityEnum,
  useBoardControllerCreateBoard,
  useWorkspaceControllerCreateBoard,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Input } from '@/features/form/Input'
import { Select } from '@/features/form/Select/Select'
import { ISelectOption } from '@/features/form/Select/types'
import { createConnectForm } from '@/hocs/createConnectForm'

interface Props {
  defaultValues: Schema
  workspaceId?: string
}

const ConnectForm = createConnectForm<Schema>()

export const BoardCreateForm: React.FC<Props> = ({
  defaultValues,
  workspaceId,
}) => {
  const { push } = useRouter()
  const { mutateAsync: createWorkspaceBoard } =
    useWorkspaceControllerCreateBoard({
      mutation: {
        onSuccess({ id }) {
          push(`/board/${id}`)
        },
      },
    })
  const { mutateAsync: createUserBoard } =
    useBoardControllerCreateBoard({
      mutation: {
        onSuccess({ id }) {
          push(`/board/${id}`)
        },
      },
    })

  const onSubmit: SubmitHandler<Schema> = async ({
    visibility,
    ...rest
  }) => {
    if (visibility === boardVisibilityEnum.WORKSPACE) {
      await createWorkspaceBoard({
        id: workspaceId ?? '',
        data: { visibility, ...rest },
      })
    } else {
      await createUserBoard({ data: { visibility, ...rest } })
    }
  }

  const options: ISelectOption[] = [
    {
      value: boardVisibilityEnum.PRIVATE,
      label: 'Приватная',
    },
    {
      value: boardVisibilityEnum.WORKSPACE,
      label: 'Рабочее пространство',
    },
    {
      value: boardVisibilityEnum.PUBLIC,
      label: 'Публичная',
    },
  ]

  return (
    <Form
      className="space-y-6"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues,
      }}
      onSubmit={onSubmit}
    >
      <ConnectForm>
        {({ control }) => (
          <Input control={control} name="title" label="Название" />
        )}
      </ConnectForm>
      <ConnectForm>
        {({ control }) => (
          <Select
            control={control}
            name="visibility"
            label="Область видимости"
            options={options}
          />
        )}
      </ConnectForm>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button disabled={isSubmitting}>Создать доску</Button>
        )}
      </ConnectForm>
    </Form>
  )
}
