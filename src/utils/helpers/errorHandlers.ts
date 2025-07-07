/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'

export const handleServerError = (error: any) => {
  if (error instanceof AxiosError) {
    throw Error(error.response?.data.message)
  }
}
