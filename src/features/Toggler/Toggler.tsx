'use client'

import React, { useEffect, useState } from 'react'

import { ToggleProps } from './types'

export const Toggler: React.FC<ToggleProps> = ({
  toggled = false,
  disabled = false,
  toggle,
  renderToggle,
  children,
}) => {
  const [isToggled, setIsToggled] = useState(toggled)

  const onToggle = () => {
    if (disabled) {
      return
    }

    toggle?.(!isToggled)
    setIsToggled((prev) => !prev)
  }

  useEffect(() => {
    setIsToggled(toggled)
  }, [toggled])

  if (isToggled) {
    return renderToggle({ onToggle })
  }

  return children({ onToggle })
}
