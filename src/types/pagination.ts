export enum PaginationOrderEnum {
  asc = 'asc',
  desc = 'desc',
}

export type PaginationParams = {
  /**
   * @default "asc"
   * @type string | undefined
   */
  order?: PaginationOrderEnum
  /**
   * @minLength 1
   * @default 1
   * @type number | undefined
   */
  page?: number | undefined
  /**
   * @minLength 1
   * @maxLength 50
   * @default 10
   * @type number | undefined
   */
  take?: number | undefined
  /**
   * @type string
   */
  search?: string
}

export interface PaginationProps {
  searchParams: PaginationParams
}

export interface PaginationAsyncProps {
  searchParams: Promise<PaginationParams>
}
