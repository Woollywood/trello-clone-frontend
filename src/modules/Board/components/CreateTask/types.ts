export interface ICreateTaskProps {
  columnId: string
  isOverlay?: boolean
}

export interface ICreateTaskFormProps {
  columnId: string
  onCancel: () => void
}
