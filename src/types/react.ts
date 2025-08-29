export type Children =
  | React.ReactNode
  | ((params: { isActive: boolean }) => React.ReactNode)
