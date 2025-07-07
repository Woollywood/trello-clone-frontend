import {
  workspacePermissionsEnum,
  workspaceVisibilityEnum,
} from '@/api/generated'

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
