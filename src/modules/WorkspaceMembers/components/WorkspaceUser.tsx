'use client'

import React from 'react'

import {
  useWorkspaceControllerExcludeUser,
  useWorkspaceControllerInviteUser,
  WorkspaceUserDto,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

interface Props {
  workspaceId: string
  user: WorkspaceUserDto
}

export const WorkspaceUser: React.FC<Props> = ({
  workspaceId,
  user: { id, username, isInvited },
}) => {
  const { mutateAsync: invite, isPending: isPendingInvite } =
    useWorkspaceControllerInviteUser()
  const { mutateAsync: exclude, isPending: isPendingExclude } =
    useWorkspaceControllerExcludeUser({})

  return (
    <div className="flex items-center justify-between">
      <p>{username}</p>
      <div className="flex items-center gap-2">
        {isInvited ? (
          <Button
            disabled={isPendingExclude}
            onClick={() =>
              exclude({ id: workspaceId, data: { userId: id } })
            }
          >
            Исключить
          </Button>
        ) : (
          <Button
            disabled={isPendingInvite}
            onClick={() =>
              invite({ id: workspaceId, data: { userId: id } })
            }
          >
            Пригласить
          </Button>
        )}
      </div>
    </div>
  )
}
