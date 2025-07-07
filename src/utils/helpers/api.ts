import axios, {
  AxiosError,
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import { redirect } from 'next/navigation'
import qs from 'qs'

import { ENV_CONFIG } from '../constants'

import {
  authControllerRefreshToken,
  TokensDto,
} from '@/api/generated'
import { sessionClient } from '@/services/session/SessionClient'
import {
  deleteSession,
  getSessionTokens,
} from '@/services/session/SessionServer'

class ApiHelpers {
  createAxiosInstance(config?: CreateAxiosDefaults) {
    return axios.create({
      adapter: 'fetch',
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
      withCredentials: true,
      ...config,
    })
  }
}

export const apiHelpers = new ApiHelpers()

class ApiInstance {
  get clientInstance() {
    let refreshPromis: Promise<void> | null = null

    const refreshing = async ({
      refreshToken,
    }: Pick<TokensDto, 'refreshToken'>) => {
      refreshPromis = new Promise<void>(async (resolve, reject) => {
        try {
          const tokens = await authControllerRefreshToken(
            { refreshToken },
            { client: apiInstance.publicInstance }
          )
          await sessionClient.createSession(tokens)
        } catch (error) {
          reject(error)
        }

        resolve()
      })

      await refreshPromis
      refreshPromis = null
    }

    const interceptRequest = async (
      config: InternalAxiosRequestConfig
    ) => {
      const tokens = await sessionClient.getSessionTokens()
      if (tokens) {
        const { accessToken } = tokens
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    }

    const interceptError = async (
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
          if (refreshPromis) {
            await refreshPromis
          } else {
            await refreshing({ refreshToken })
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

    const apiClient = apiHelpers.createAxiosInstance({
      baseURL: ENV_CONFIG.API_ENDPOINT,
    })
    apiClient.interceptors.request.use(interceptRequest)
    apiClient.interceptors.response.use(
      (config) => config,
      (error) => interceptError(error, apiClient)
    )
    return apiClient
  }

  get serverInstance() {
    const interceptRequest = async (
      config: InternalAxiosRequestConfig
    ) => {
      try {
        const tokens = await getSessionTokens()
        if (tokens) {
          const { accessToken } = tokens
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      } catch (error) {
        console.log(error)
        await deleteSession()
        redirect(ENV_CONFIG.SIGN_IN_URL)
      }
    }

    const interceptError = async (error: AxiosError) => {
      if (error.response?.status === 401) {
        await deleteSession()
        redirect(ENV_CONFIG.SIGN_IN_URL)
      }
    }

    const apiClient = apiHelpers.createAxiosInstance({
      baseURL: ENV_CONFIG.API_ENDPOINT,
    })
    apiClient.interceptors.request.use(interceptRequest)
    apiClient.interceptors.response.use(
      (config) => config,
      interceptError
    )
    return apiClient
  }

  get nextInstance() {
    return apiHelpers.createAxiosInstance({
      baseURL: `${ENV_CONFIG.BASE_URL}/api`,
    })
  }

  get publicInstance() {
    return apiHelpers.createAxiosInstance({
      baseURL: ENV_CONFIG.API_ENDPOINT,
    })
  }
}
export const apiInstance = new ApiInstance()
