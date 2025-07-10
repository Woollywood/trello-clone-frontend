'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import {
  useAuthControllerIdentity,
  useWorkspaceControllerExcludeUser,
  useWorkspaceControllerFindWorkspace,
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
  const { id } = useParams<{ id: string }>()
  const { data: workspace } = useWorkspaceControllerFindWorkspace(id)

  const role = getUserRole(permissions)
  const { data: identity } = useAuthControllerIdentity()
  const { mutateAsync: leave, isPending: isPendingLeave } =
    useWorkspaceControllerLeave()

  const { mutateAsync: excludeUser, isPending: isPendingExclude } =
    useWorkspaceControllerExcludeUser()

  const shouldShowActions = !!identity && !!workspace
  const isCreator = workspace?.createById === identity?.id
  const shouldShowExclude = isCreator && identity?.id !== user?.id
  const shouldShowLeave = !isCreator && identity?.id === user?.id

  return (
    <div className="flex items-center justify-between">
      <p>{user?.username}</p>
      <div className="flex items-center gap-8">
        {role && <p>{workspaceRolesDictionary[role]}</p>}
        {shouldShowActions && (
          <>
            {shouldShowExclude && (
              <Button
                disabled={isPendingExclude}
                onClick={() =>
                  excludeUser({
                    id: workspaceId,
                    data: { userId: user?.id ?? '' },
                  })
                }
              >
                Исключить
              </Button>
            )}
            {shouldShowLeave && (
              <Button
                disabled={isPendingLeave}
                onClick={() => leave({ id: workspaceId })}
              >
                Покинуть
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
