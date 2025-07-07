'use client'

import { NextPage } from 'next'

import {
  WorkspaceMemberList,
  WorkspaceMembersHeader,
  WorkspaceUserList,
} from './components'
import { useQueries } from './hooks'

interface Props {
  id: string
}

export const WorkspaceMembers: NextPage<Props> = ({ id }) => {
  const { queryState } = useQueries()

  return (
    <div className="flex flex-col gap-6">
      <WorkspaceMembersHeader />
      {queryState === 'members' && <WorkspaceMemberList id={id} />}
      {queryState === 'users' && <WorkspaceUserList id={id} />}
    </div>
  )
}
