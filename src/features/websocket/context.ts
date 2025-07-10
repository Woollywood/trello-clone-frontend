'use client'

import { createContext } from 'react'

import { IWebsocketContext } from './types'

export const WebsocketContext = createContext<IWebsocketContext>({
  socket: null,
})
