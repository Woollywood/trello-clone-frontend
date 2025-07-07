import { InfiniteData } from '@tanstack/react-query'

import { PaginatedBaseDto } from '@/types'

export const flatDataFromInfiniteQuery = <T>(
  data: InfiniteData<PaginatedBaseDto<T>>
) =>
  data?.pages.reduce((acc, { data }) => [...acc, ...data], [] as T[])
