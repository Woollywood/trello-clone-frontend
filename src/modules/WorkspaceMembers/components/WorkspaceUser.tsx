'use client'

import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import {
  useWorkspaceControllerExcludeUserInvitation,
  useWorkspaceControllerInviteUser,
  workspaceControllerListUsersQueryKey,
  WorkspaceUserDto,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'

interface Props {
  workspaceId: string
  user: WorkspaceUserDto
}

export const WorkspaceUser: React.FC<Props> = ({
  workspaceId,
  user: { id, username, isInvited },
}) => {
  const { search } = usePagination()
  const queryClient = useQueryClient()
  const { mutateAsync: invite, isPending: isPendingInvite } =
    useWorkspaceControllerInviteUser({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: workspaceControllerListUsersQueryKey(
              workspaceId,
              { search }
            ),
          })
        },
      },
    })
  const { mutateAsync: exclude, isPending: isPendingExclude } =
    useWorkspaceControllerExcludeUserInvitation({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: workspaceControllerListUsersQueryKey(
              workspaceId,
              { search }
            ),
          })
        },
      },
    })

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
            Отозвать приглашение
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
