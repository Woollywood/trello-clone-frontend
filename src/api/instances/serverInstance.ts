import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

import { createAxiosInstance } from '../helpers'

import { getSessionTokens } from '@/services/session/SessionServer'
import { ENV_CONFIG } from '@/utils/constants'

const interceptError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    redirect(ENV_CONFIG.SIGN_IN_URL)
  }
}

export const createServerInstance = async () => {
  const tokens = await getSessionTokens()

  const serverInstance = createAxiosInstance({
    baseURL: ENV_CONFIG.API_ENDPOINT,
  })
  if (tokens) {
    const { accessToken } = tokens
    serverInstance.defaults.headers['Authorization'] =
      `Bearer ${accessToken}`
  }
  serverInstance.interceptors.response.use(
    (config) => config,
    interceptError
  )
  return serverInstance
}
