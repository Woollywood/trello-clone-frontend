'use client'

import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

import { Notifications } from './components/Notifications'
import { Profile } from './components/Profile'

import {
  Notification,
  useNotificationControllerCountNotifications,
  useNotificationControllerListNotificationsInfinite,
} from '@/api/generated'
import { Chips } from '@/components/ui/chips'
import { useEventListener } from '@/features/websocket'
import { usePagination } from '@/hooks/usePagination'

export const RootHeader: React.FC = () => {
  const { search } = usePagination()
  const { data, refetch: refetchNotificationsCount } =
    useNotificationControllerCountNotifications()
  const { refetch: refetchNotificationsList } =
    useNotificationControllerListNotificationsInfinite(
      { search },
      { query: { enabled: false } }
    )

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

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/">Лого</Link>
      <div className="flex items-center gap-4">
        <Chips value={data && !!data ? data : null}>
          <Notifications />
        </Chips>
        <Profile />
      </div>
    </header>
  )
}
