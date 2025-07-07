import React from 'react'

import { NotificationWorkspace } from './NotificationWorkspace'

import { Notification, notificationTypeEnum } from '@/api/generated'

export const NotificationItem: React.FC<Notification> = (
  notification
) => {
  switch (notification.type) {
    case notificationTypeEnum.WORKSPACE_INVITATION:
      return <NotificationWorkspace {...notification} />
  }
}
