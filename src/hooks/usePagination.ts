import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

import { PaginationOrderEnum } from '@/types'

export const usePagination = () => {
  const [pageQuery, setPageQuery] = useQueryStates({
    search: parseAsString,
    order: parseAsStringEnum<PaginationOrderEnum>([
      PaginationOrderEnum.asc,
      PaginationOrderEnum.desc,
    ]).withDefault(PaginationOrderEnum.asc),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10),
  })

  return {
    ...pageQuery,
    search: pageQuery.search ?? undefined,
    setPageQuery,
  }
}
