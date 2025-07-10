import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import {
  Notification,
  notificationControllerCountNotificationsQueryKey,
  notificationControllerListNotificationsInfiniteQueryKey,
  userControllerFindWorkSpacesInfiniteQueryKey,
  useWorkspaceControllerAcceptInvite,
  useWorkspaceControllerRejectInvite,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

export const NotificationWorkspace: React.FC<Notification> = ({
  sender,
  workspace,
}) => {
  const queryClient = useQueryClient()
  const { mutateAsync: acceptInvite, isPending: isPendingAccept } =
    useWorkspaceControllerAcceptInvite({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              notificationControllerListNotificationsInfiniteQueryKey(),
          })
          queryClient.invalidateQueries({
            queryKey:
              notificationControllerCountNotificationsQueryKey(),
          })
          queryClient.invalidateQueries({
            queryKey: userControllerFindWorkSpacesInfiniteQueryKey(),
          })
        },
      },
    })
  const { mutateAsync: rejectInvite, isPending: isPendingReject } =
    useWorkspaceControllerRejectInvite({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              notificationControllerListNotificationsInfiniteQueryKey(),
          })
          queryClient.invalidateQueries({
            queryKey:
              notificationControllerCountNotificationsQueryKey(),
          })
        },
      },
    })

  const isPending = isPendingAccept || isPendingReject

  return (
    <div className="flex flex-col gap-2">
      <p>
        {sender?.username} Приглашает вас в рабочее пространство{' '}
        {workspace?.title}
      </p>
      <div className="flex items-center gap-2">
        <Button
          disabled={isPending}
          onClick={() => acceptInvite({ id: workspace?.id ?? '' })}
        >
          Принять
        </Button>
        <Button
          disabled={isPending}
          onClick={() => rejectInvite({ id: workspace?.id ?? '' })}
        >
          Отклонить
        </Button>
      </div>
    </div>
  )
}
