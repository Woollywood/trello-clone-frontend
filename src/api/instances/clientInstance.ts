import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'

import { authControllerRefreshToken, TokensDto } from '../generated'
import { createAxiosInstance } from '../helpers'

import { publicInstance } from './publicInstance'

import { sessionClient } from '@/services/session/SessionClient'
import { ENV_CONFIG } from '@/utils/constants'

class Interceptors {
  private refreshPromis: Promise<void> | null = null

  private async refreshing({
    refreshToken,
  }: Pick<TokensDto, 'refreshToken'>) {
    this.refreshPromis = new Promise<void>(
      async (resolve, reject) => {
        try {
          const tokens = await authControllerRefreshToken(
            { refreshToken },
            { client: publicInstance }
          )
          await sessionClient.createSession(tokens)
        } catch (error) {
          reject(error)
        }

        resolve()
      }
    )

    await this.refreshPromis
    this.refreshPromis = null
  }

  async interceptRequest(config: InternalAxiosRequestConfig) {
    const tokens = await sessionClient.getSessionTokens()
    if (tokens) {
      const { accessToken } = tokens
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  }

  interceptError = async (
    error: AxiosError,
    instance: AxiosInstance
  ) => {
    const originalConfig = error.response?.config

    if (
      error.response?.status === 401 &&
      sessionClient.hasSessionTokens()
    ) {
      try {
        const { refreshToken } =
          await sessionClient.getSessionTokens()
        if (this.refreshPromis) {
          await this.refreshPromis
        } else {
          await this.refreshing({ refreshToken })
        }
        return instance.request(originalConfig!)
      } catch (error) {
        if (error instanceof Error) {
          sessionClient.deleteSession()
        }
      }
    }

    const response = error.response
    throw new AxiosError(
      response?.statusText,
      undefined,
      response?.config,
      response?.request,
      response
    )
  }
}

const interceptors = new Interceptors()
export const clientInstance = createAxiosInstance({
  baseURL: ENV_CONFIG.API_ENDPOINT,
})
clientInstance.interceptors.request.use(interceptors.interceptRequest)
clientInstance.interceptors.response.use(
  (config) => config,
  (error) => interceptors.interceptError(error, clientInstance)
)
