import React from 'react'

import {
  Notification,
  useWorkspaceControllerAcceptInvite,
  useWorkspaceControllerRejectInvite,
} from '@/api/generated'
import { Button } from '@/components/ui/button'

export const NotificationWorkspace: React.FC<Notification> = ({
  sender,
  workspace,
}) => {
  const { mutateAsync: acceptInvite, isPending: isPendingAccept } =
    useWorkspaceControllerAcceptInvite()
  const { mutateAsync: rejectInvite, isPending: isPendingReject } =
    useWorkspaceControllerRejectInvite()

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
