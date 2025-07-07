import React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type ICheckboxFormProps } from './types'

import { FormControl } from '@/components/shared/form/FormControl'
import { FormDescription } from '@/components/shared/form/FormDescription'
import { FormField } from '@/components/shared/form/FormField'
import { FormItem } from '@/components/shared/form/FormItem'
import { FormLabel } from '@/components/shared/form/FormLabel'
import { FormMessage } from '@/components/shared/form/FormMessage'
import { Checkbox as UCheckbox } from '@/components/ui/checkbox'

export const Checkbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  isRequired,
  label,
  description,
  name,
  control,
  controllerProps,
  ...props
}: ICheckboxFormProps<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1">
            <FormControl>
              <UCheckbox {...props} {...field} />
            </FormControl>
            <FormLabel
              isRequired={isRequired}
              aria-required={isRequired}
              label={label}
            />
          </div>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
