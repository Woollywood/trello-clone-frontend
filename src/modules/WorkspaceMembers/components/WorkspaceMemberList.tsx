'use client'

import { NextPage } from 'next'

import { WorkspaceMember } from './WorkspaceMember'

import { useWorkspaceControllerListMembersInfinite } from '@/api/generated'
import { usePagination } from '@/hooks/usePagination'
import { flatDataFromInfiniteQuery } from '@/utils/helpers/tanstack'

interface Props {
  id: string
}

export const WorkspaceMemberList: NextPage<Props> = ({ id }) => {
  const { search } = usePagination()
  const {
    data: workspaceMembers,
    isPending: isPendingWorkspaceMembers,
  } = useWorkspaceControllerListMembersInfinite(id, { search })

  if (isPendingWorkspaceMembers || !workspaceMembers) {
    return null
  }

  const flattenData = flatDataFromInfiniteQuery(workspaceMembers)
  return (
    <div>
      {flattenData.map((member) => (
        <WorkspaceMember key={member.id} {...member} />
      ))}
    </div>
  )
}
