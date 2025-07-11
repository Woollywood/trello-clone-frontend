const workspaceVisibilityEnum = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const

const workspacePermissionsEnum = {
  MANAGE: 'MANAGE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  INVITE: 'INVITE',
  EXCLUDE_INVITE: 'EXCLUDE_INVITE',
  EXCLUDE: 'EXCLUDE',
} as const

export const workspaceVisibilityDictionary = {
  [workspaceVisibilityEnum.PUBLIC]: 'Публичная',
  [workspaceVisibilityEnum.PRIVATE]: 'Приватная',
}

export enum WorkspaceRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VIEWER = 'VIEWER',
}

export const workspaceRolesMapping = {
  [WorkspaceRoles.ADMIN]: [workspacePermissionsEnum.MANAGE],
  [WorkspaceRoles.USER]: [
    workspacePermissionsEnum.UPDATE,
    workspacePermissionsEnum.DELETE,
  ],
  [WorkspaceRoles.VIEWER]: [workspacePermissionsEnum.READ],
}

export const workspaceRolesDictionary = {
  [WorkspaceRoles.ADMIN]: 'Админ',
  [WorkspaceRoles.USER]: 'Обычный пользователь',
  [WorkspaceRoles.VIEWER]: 'Наблюдатель',
}
