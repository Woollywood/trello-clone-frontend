import { parseAsStringEnum, useQueryState } from 'nuqs'

import { WorkspaceMembersType } from '../types'

export const useQueries = () => {
  const [queryState, setQueryState] = useQueryState(
    'type',
    parseAsStringEnum<WorkspaceMembersType>([
      'members',
      'users',
    ]).withDefault('members')
  )

  return { queryState, setQueryState }
}
