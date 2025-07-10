import { useContext } from 'react'

import { WebsocketContext } from '../context'

export const useWebsocket = () => {
  return useContext(WebsocketContext)
}
