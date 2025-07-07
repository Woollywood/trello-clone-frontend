import { ParsedUrlQuery } from 'querystring'

import { PaginationOrderEnum } from '@/types'

export const getServerPagination = (params?: ParsedUrlQuery) => {
  const paginationParams = {
    search: (params?.['search'] as string | undefined) ?? '',
    order:
      (params?.['order'] as PaginationOrderEnum) ??
      PaginationOrderEnum.asc,
    page: Number(params?.['page'] ?? 1),
    take: Number(params?.['take'] ?? 10),
  }

  return paginationParams
}
