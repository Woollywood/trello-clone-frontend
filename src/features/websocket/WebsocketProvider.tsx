'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { WebsocketContext } from './context'

import { useAuthControllerIdentity } from '@/api/generated'
import { WsApi } from '@/api/websocket/wsApi'

export const WebsocketProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: identity } = useAuthControllerIdentity()
  const socketApi = useRef(new WsApi())
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (identity) {
      const connectSocket = async () => {
        await socketApi.current.connect()
        setSocket(socketApi.current.socket)
      }

      connectSocket()

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        socketApi.current.socket?.disconnect()
      }
    }
  }, [identity, socketApi])

  return (
    <WebsocketContext.Provider value={{ socket }}>
      {children}
    </WebsocketContext.Provider>
  )
}
