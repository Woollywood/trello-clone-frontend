import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type IRadioGroupFormProps } from './types'

import { FormControl } from '@/components/shared/form/FormControl'
import { FormDescription } from '@/components/shared/form/FormDescription'
import { FormField } from '@/components/shared/form/FormField'
import { FormItem } from '@/components/shared/form/FormItem'
import { FormMessage } from '@/components/shared/form/FormMessage'
import { Label } from '@/components/ui/label'
import {
  RadioGroup as URadioGroup,
  RadioGroupItem as URadioGroupItem,
} from '@/components/ui/radio-group'

export const RadioGroup = <
  ItemValue extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  description,
  name,
  control,
  controllerProps,
  items,
  ...props
}: IRadioGroupFormProps<ItemValue, TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <URadioGroup {...props} {...field}>
              <div className="space-y-2">
                {items.map(({ label, value }) => (
                  <div
                    key={value}
                    className="flex items-center gap-1"
                  >
                    <URadioGroupItem
                      id={value}
                      value={value}
                      onClick={() => field.onChange(value)}
                    />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
              </div>
            </URadioGroup>
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
