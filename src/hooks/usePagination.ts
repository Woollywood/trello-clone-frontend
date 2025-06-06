import { useNextRouter } from '@/hooks/useNextRouter'
import { usePageRangeDisplayed } from '@/hooks/usePageRangeDisplayed'

export interface UsePaginationParams {
  queryField?: string
  itemsPerPage: number
  page?: number
  setPage?: (page: number) => void
}

export const usePagination = ({
  queryField = 'page',
  itemsPerPage,
  page,
  setPage,
}: UsePaginationParams) => {
  const { query, toShallowRoute } = useNextRouter()
  const pageRange = usePageRangeDisplayed()
  const queryPage = page ?? query?.[queryField]

  const onChangePage = (page: number) => {
    if (setPage) {
      setPage(page)
      return
    }
    toShallowRoute(
      {
        page: page + 1,
      },
      {
        options: { scroll: true },
      }
    )
  }

  const forcePage = queryPage ? Number(queryPage) : 1
  return {
    pageRange,
    onChangePage,
    forcePage,
    maxCountItemsPage: itemsPerPage,
  }
}
