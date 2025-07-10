import { Socket } from 'socket.io-client'

export interface IWebsocketContext {
  socket: Socket | null
}
