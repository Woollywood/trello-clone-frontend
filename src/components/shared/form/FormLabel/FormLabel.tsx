'use client'

import { useFormField } from '../hooks'

import { type IFormLabelProps } from './types'

import { Label } from '@/components/ui/label'
import { cn } from '@/utils/helpers'

export function FormLabel({
  className,
  isRequired,
  label,
  ...props
}: IFormLabelProps) {
  const { error, formItemId } = useFormField()

  if (!label) {
    return null
  }

  return (
    <div className="flex gap-0.5">
      <Label
        data-slot="form-label"
        data-error={!!error}
        className={cn(
          'data-[error=true]:text-destructive',
          className
        )}
        htmlFor={formItemId}
        {...props}
      >
        {label}
      </Label>
      {isRequired && <span className="text-sm text-red-600">*</span>}
    </div>
  )
}
