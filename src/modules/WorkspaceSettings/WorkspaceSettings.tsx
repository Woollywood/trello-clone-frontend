'use client'

import { NextPage } from 'next'
import React from 'react'

import { WorkspaceSettingsForm } from './components/WorkspaceSettingsForm'
import { WorkspaceVisibility } from './components/WorkspaceVisibility'

import { useWorkspaceControllerFindWorkspace } from '@/api/generated'

interface Props {
  id: string
}

export const WorkspaceSettings: NextPage<Props> = ({ id }) => {
  const { data: workspace } = useWorkspaceControllerFindWorkspace(id)

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
      </div>
    </div>
  )
}
