import { createAxiosInstance } from '../helpers'

import { ENV_CONFIG } from '@/utils/constants'

export const nextInstance = createAxiosInstance({
  baseURL: `${ENV_CONFIG.BASE_URL}/api`,
})
