'use client'

import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { VisibilityForm } from './types'

import {
  useWorkspaceControllerUpdateVisibility,
  Workspace,
  workspaceControllerFindWorkspaceQueryKey,
  workspaceVisibilityEnum,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Form } from '@/features/form/Form'
import { RadioGroup } from '@/features/form/RadioGroup'
import { createConnectForm } from '@/hocs/createConnectForm'
import { workspaceVisibilityDictionary } from '@/utils/constants'

const ConnectForm = createConnectForm<VisibilityForm>()

export const WorkspaceVisibility: React.FC<
  Pick<Workspace, 'visibility' | 'id'>
> = ({ id, visibility }) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2>Видимость рабочего пространства</h2>
        <p>{workspaceVisibilityDictionary[visibility]}</p>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Изменить</Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="space-y-4">
            <p>Выберите видимость</p>
            <Form<VisibilityForm>
              className="w-64 space-y-4"
              useFormProps={{
                defaultValues: { visibility },
              }}
              onSubmit={() => undefined}
            >
              <WorkspaceVisibilityForm id={id} />
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const WorkspaceVisibilityForm: React.FC<{ id: string }> = ({
  id,
}) => {
  const queryClient = useQueryClient()
  const { mutateAsync: onSubmit } =
    useWorkspaceControllerUpdateVisibility({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: workspaceControllerFindWorkspaceQueryKey(id),
          })
        },
      },
    })

  const {
    formState: { touchedFields },
    handleSubmit,
  } = useFormContext<VisibilityForm>()
  const visibility = useWatch<VisibilityForm>({ name: 'visibility' })
  useEffect(() => {
    if (touchedFields.visibility) {
      handleSubmit(async ({ visibility }) =>
        onSubmit({ id, data: { visibility } })
      )()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility])

  return (
    <ConnectForm>
      {({ control, formState: { isSubmitting } }) => (
        <RadioGroup
          control={control}
          disabled={isSubmitting}
          name="visibility"
          items={[
            {
              label:
                workspaceVisibilityDictionary[
                  workspaceVisibilityEnum.PUBLIC
                ],
              value: workspaceVisibilityEnum.PUBLIC,
            },
            {
              label:
                workspaceVisibilityDictionary[
                  workspaceVisibilityEnum.PRIVATE
                ],
              value: workspaceVisibilityEnum.PRIVATE,
            },
          ]}
        />
      )}
    </ConnectForm>
  )
}
