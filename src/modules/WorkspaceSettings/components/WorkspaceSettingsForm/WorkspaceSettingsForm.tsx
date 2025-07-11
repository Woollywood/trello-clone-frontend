'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'

import {
  WorkspaceSettingsSchema,
  workspaceSettingsSchema,
} from './schema'

import {
  userControllerFindWorkSpacesInfiniteQueryKey,
  useWorkspaceControllerUpdateWorkspace,
  Workspace,
  workspaceControllerFindWorkspaceQueryKey,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Input } from '@/features/form/Input'
import { createConnectForm } from '@/hocs/createConnectForm'
import { workspaceVisibilityDictionary } from '@/utils/constants'

const ConnectForm = createConnectForm<WorkspaceSettingsSchema>()

export const WorkspaceSettingsForm: React.FC<Workspace> = ({
  id,
  title,
  visibility,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditingMode = () => setIsEditing((prev) => !prev)

  const queryClient = useQueryClient()
  const { mutateAsync: onSubmit } =
    useWorkspaceControllerUpdateWorkspace({
      mutation: {
        onSuccess() {
          toggleEditingMode()
          queryClient.invalidateQueries({
            queryKey: userControllerFindWorkSpacesInfiniteQueryKey(),
          })
          queryClient.invalidateQueries({
            queryKey: workspaceControllerFindWorkspaceQueryKey(id),
          })
        },
      },
    })

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center gap-2">
          <h2>{title}</h2>
          <button
            className="flex cursor-pointer items-center justify-center rounded-full p-1"
            onClick={toggleEditingMode}
          >
            <Pencil size={16} />
          </button>
        </div>
        <p>{workspaceVisibilityDictionary[visibility]}</p>
      </div>
    )
  }

  return (
    <Form
      className="w-64 space-y-4"
      useFormProps={{
        resolver: zodResolver(workspaceSettingsSchema),
        defaultValues: { title },
      }}
      onSubmit={async (dto) => onSubmit({ id, data: dto })}
    >
      <ConnectForm>
        {({ control }) => (
          <Input
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
          />
        )}
      </ConnectForm>
      <div className="flex items-center gap-2">
        <Button>Сохранить</Button>
        <Button
          variant="secondary"
          type="button"
          onClick={toggleEditingMode}
        >
          Отменить
        </Button>
      </div>
    </Form>
  )
}
