import React from 'react'

interface ChildrenProps {
  onToggle: () => void
}

export interface ToggleProps {
  toggled?: boolean
  toggle?: (nextValue: boolean) => void
  renderToggle: (props: ChildrenProps) => React.ReactNode
  children: (props: ChildrenProps) => React.ReactNode
}
