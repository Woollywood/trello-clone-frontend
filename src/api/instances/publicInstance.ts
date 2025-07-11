import { createAxiosInstance } from '../helpers'

import { ENV_CONFIG } from '@/utils/constants'

export const publicInstance = createAxiosInstance({
  baseURL: ENV_CONFIG.API_ENDPOINT,
})
