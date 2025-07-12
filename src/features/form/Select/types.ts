import { type FieldPath, type FieldValues } from 'react-hook-form'

import { ISelectProps } from '@/components/ui/select'
import { type IBaseInputFormProps } from '@/types'

export type ISelectFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> &
  ISelectProps & { options: ISelectOption[] }

export interface ISelectOption {
  label: string
  value: string
}
