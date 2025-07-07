'use client'

import React from 'react'

import { useQueries } from '../hooks'

import { SearchInput } from '@/components/shared/SearchInput'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'

export const WorkspaceMembersHeader: React.FC = () => {
  const { setPageQuery } = usePagination()
  const { queryState, setQueryState } = useQueries()

  const toggleType = () => {
    setQueryState((prev) =>
      prev === 'members' ? 'users' : 'members'
    )
    setPageQuery({ search: '', page: 1 })
  }

  return (
    <div className="flex items-center justify-between">
      <SearchInput
        placeholder="Фильтровать по именам"
        className="max-w-64"
      />
      <Button onClick={toggleType}>
        {queryState === 'members'
          ? 'Пригласить'
          : 'Вернуться к списку участников'}
      </Button>
    </div>
  )
}
