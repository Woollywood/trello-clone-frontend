'use client'

import React from 'react'

import { FormItemContext } from '../context/FormItemContext'

import { cn } from '@/utils/helpers'

export function FormItem({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}
