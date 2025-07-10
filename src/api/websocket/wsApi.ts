import { io, Socket } from 'socket.io-client'

import { sessionClient } from '@/services/session/SessionClient'
import { ENV_CONFIG } from '@/utils/constants'

export class WsApi {
  private _socket: Socket | null = null

  constructor() {}

  async connect() {
    const { accessToken } = await sessionClient.getSessionTokens()

    this._socket = io(ENV_CONFIG.API_ENDPOINT, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    this._socket.on('connect', () => {
      console.log('connected')
    })

    this._socket.on('connect_error', (err) => {
      if (err instanceof Error) {
        console.log(err)
      }
    })

    this._socket.on('disconnect', () => {
      console.log('disconnect')
    })
  }

  get socket() {
    return this._socket
  }
}
