'use client'

import React from 'react'

import {
  useAuthControllerIdentity,
  useWorkspaceControllerLeave,
  WorkspaceMember as WorkspaceMemberType,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { workspaceRolesDictionary } from '@/utils/constants'
import { getUserRole } from '@/utils/helpers'

export const WorkspaceMember: React.FC<WorkspaceMemberType> = ({
  workspaceId,
  user,
  permissions,
}) => {
  const role = getUserRole(permissions)
  const { data: identity } = useAuthControllerIdentity()
  const { mutateAsync: leave, isPending } =
    useWorkspaceControllerLeave()

  return (
    <div className="flex items-center justify-between">
      <p>{user?.username}</p>
      <div className="flex items-center gap-8">
        {role && <p>{workspaceRolesDictionary[role]}</p>}
        {identity?.id === user?.id && (
          <Button
            disabled={isPending}
            onClick={() => leave({ id: workspaceId })}
          >
            Покинуть
          </Button>
        )}
      </div>
    </div>
  )
}
