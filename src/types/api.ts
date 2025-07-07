import { PageMetaDto } from '@/api/generated'

export type PaginatedBaseDto<T> = {
  /**
   * @type array
   */
  data: T[]
  /**
   * @type object
   */
  meta: PageMetaDto
}

export interface ErrorResponse {
  message: string
}
