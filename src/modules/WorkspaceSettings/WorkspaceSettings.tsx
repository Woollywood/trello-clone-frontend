'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React from 'react'

import { WorkspaceSettingsForm } from './components/WorkspaceSettingsForm'
import { WorkspaceVisibility } from './components/WorkspaceVisibility'

import {
  useWorkspaceControllerDelete,
  useWorkspaceControllerFindWorkspace,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

interface Props {
  id: string
}

export const WorkspaceSettings: NextPage<Props> = ({ id }) => {
  const { push } = useRouter()
  const { data: workspace } = useWorkspaceControllerFindWorkspace(id)
  const { mutateAsync: deleteWorkspace, isPending } =
    useWorkspaceControllerDelete({
      mutation: {
        onSuccess: () => {
          push('/')
        },
      },
    })

  if (!workspace) {
    return null
  }

  return (
    <div>
      <h2 className="mb-12 text-4xl font-bold">
        Настройки рабочего пространства
      </h2>
      <div className="space-y-8">
        <WorkspaceSettingsForm {...workspace} />
        <WorkspaceVisibility
          id={workspace.id}
          visibility={workspace.visibility}
        />
        <Button
          disabled={isPending}
          onClick={() => deleteWorkspace({ id })}
        >
          Удалить
        </Button>
      </div>
    </div>
  )
}
