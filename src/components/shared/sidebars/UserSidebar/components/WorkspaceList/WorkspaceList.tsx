'use client'

import { WorkspaceItem } from './WorkspaceItem'

import { useUserControllerFindWorkSpaces } from '@/api/generated'

export const WorkspaceList: React.FC = () => {
  const { data: workspaces } = useUserControllerFindWorkSpaces()

  if (!workspaces) {
    return null
  }

  return (
    <div>
      <p className="text-xl">Рабочее пространство</p>
      {workspaces.data.map((workspace) => (
        <WorkspaceItem key={workspace.id} {...workspace} />
      ))}
    </div>
  )
}
