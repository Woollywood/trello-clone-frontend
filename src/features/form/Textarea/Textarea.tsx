import React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'

import { ITextareaFormProps } from './types'

import { FormControl } from '@/components/shared/form/FormControl'
import { FormDescription } from '@/components/shared/form/FormDescription'
import { FormField } from '@/components/shared/form/FormField'
import { FormItem } from '@/components/shared/form/FormItem'
import { FormLabel } from '@/components/shared/form/FormLabel'
import { FormMessage } from '@/components/shared/form/FormMessage'
import { Textarea as UTextarea } from '@/components/ui/textarea'

export const Textarea = <
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
}: ITextareaFormProps<TFieldValues, TName>) => {
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
            <UTextarea {...props} {...field} />
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
