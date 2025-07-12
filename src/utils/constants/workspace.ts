export const workspaceVisibilityEnum = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const

export const workspaceRolesEnum = {
  ADMIN: 'ADMIN',
  PARTICIPANT: 'PARTICIPANT',
  VIEWER: 'VIEWER',
} as const

export const workspaceVisibilityDictionary = {
  [workspaceVisibilityEnum.PUBLIC]: 'Публичная',
  [workspaceVisibilityEnum.PRIVATE]: 'Приватная',
}

export const workspaceRolesDictionary = {
  [workspaceRolesEnum.ADMIN]: 'Админ',
  [workspaceRolesEnum.PARTICIPANT]: 'Участник',
  [workspaceRolesEnum.VIEWER]: 'Наблюдатель',
}
