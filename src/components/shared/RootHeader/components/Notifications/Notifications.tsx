'use client'

import { Bell } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

import { NotificationItem } from './NotificationItem'

import {
  Notification,
  useNotificationControllerCountNotifications,
  useNotificationControllerListNotificationsInfinite,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Chips } from '@/components/ui/chips'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEventListener } from '@/features/websocket'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

export const Notifications: React.FC = () => {
  const { search } = usePagination()
  const { data: notifications, refetch: refetchNotificationsList } =
    useNotificationControllerListNotificationsInfinite({ search })
  const {
    data: notificationsCount,
    refetch: refetchNotificationsCount,
  } = useNotificationControllerCountNotifications()

  useEventListener('notifications/get', (data: Notification) => {
    toast(
      `Вас приглашают в рабочее пространство ${data.workspace?.title}`
    )
    refetchNotificationsList()
    refetchNotificationsCount()
  })
  useEventListener('notifications/remove', (data: Notification) => {
    toast(
      `Приглашение в рабочее пространство ${data.workspace?.title} отозвано`
    )
    refetchNotificationsList()
    refetchNotificationsCount()
  })

  const flattenNotifications = notifications
    ? flatDataFromInfiniteQuery(notifications)
    : []

  return (
    <Chips
      value={
        notificationsCount && !!notificationsCount
          ? notificationsCount
          : null
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Bell />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-4">
          {flattenNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Chips>
  )
}
