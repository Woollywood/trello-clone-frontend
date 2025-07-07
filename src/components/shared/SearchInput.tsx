'use client'

import { Search, X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import React, { useState } from 'react'

import { IInputProps, Input } from '@/components/ui/input'
import { AnyFunc } from '@/types'

export interface ISearchInputProps extends IInputProps {
  queryParam?: string
  onSearch?: (value: string) => void
  onClear?: AnyFunc
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  queryParam = 'search',
  onSearch,
  onClear,
  ...props
}) => {
  const [queryState, setQueryState] = useQueryState(
    queryParam,
    parseAsString.withDefault('')
  )
  const [value, setValue] = useState(queryState)

  const isEmpty = value.length === 0
  const isQueryEmpty = queryState.length === 0

  const handleSearch = () => {
    setQueryState(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setValue('')
    setQueryState('')
    onClear?.()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const icon = isQueryEmpty ? (
    <button
      className="flex cursor-pointer items-center justify-center"
      onClick={handleSearch}
    >
      <Search size={20} />
    </button>
  ) : (
    <button
      className="flex cursor-pointer items-center justify-center"
      onClick={handleClear}
    >
      <X size={20} />
    </button>
  )

  return (
    <Input
      value={value}
      endIcon={!isEmpty && icon}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}
