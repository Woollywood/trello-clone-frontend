'use client'

import { Bell } from 'lucide-react'
import React from 'react'

import { NotificationItem } from './NotificationItem'

import { useNotificationControllerListNotificationsInfinite } from '@/api/generated'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

export const Notifications: React.FC = () => {
  const { search } = usePagination()
  const { data: notifications } =
    useNotificationControllerListNotificationsInfinite({ search })
  const flattenNotifications = notifications
    ? flatDataFromInfiniteQuery(notifications)
    : []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-4">
        {flattenNotifications.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
