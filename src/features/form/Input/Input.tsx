import React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type IInputFormProps } from './types'

import { FormControl } from '@/components/shared/form/FormControl'
import { FormDescription } from '@/components/shared/form/FormDescription'
import { FormField } from '@/components/shared/form/FormField'
import { FormItem } from '@/components/shared/form/FormItem'
import { FormLabel } from '@/components/shared/form/FormLabel'
import { FormMessage } from '@/components/shared/form/FormMessage'
import { Input as UInput } from '@/components/ui/input'

export const Input = <
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
}: IInputFormProps<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            isRequired={isRequired}
            aria-required={isRequired}
            label={label}
          />
          <FormControl>
            <UInput {...props} {...field} />
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
