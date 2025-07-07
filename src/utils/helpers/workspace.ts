import { WorkspaceRoles, workspaceRolesMapping } from '../constants'

import { WorkspacePermissions } from '@/api/generated'

export const getUserRole = (
  permissions: WorkspacePermissions[]
): WorkspaceRoles | undefined => {
  if (
    permissions.some((permission) =>
      workspaceRolesMapping[WorkspaceRoles.ADMIN].some(
        (value) => value === permission
      )
    )
  ) {
    return WorkspaceRoles.ADMIN
  }

  if (
    permissions.some((permission) =>
      workspaceRolesMapping[WorkspaceRoles.USER].some(
        (value) => value === permission
      )
    )
  ) {
    return WorkspaceRoles.USER
  }

  if (
    permissions.some((permission) =>
      workspaceRolesMapping[WorkspaceRoles.VIEWER].some(
        (value) => value === permission
      )
    )
  ) {
    return WorkspaceRoles.VIEWER
  }

  return WorkspaceRoles.VIEWER
}
