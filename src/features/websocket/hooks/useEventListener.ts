'use client'

import { useEffect } from 'react'

import { useWebsocket } from './useWebsocket'

import { AnyFunc } from '@/types'

export const useEventListener = (
  event: string,
  listener: AnyFunc
) => {
  const { socket } = useWebsocket()

  useEffect(() => {
    if (socket) {
      socket.on(event, listener)

      return () => {
        socket.off(event)
      }
    }
  }, [event, socket, listener])
}
