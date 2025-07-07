import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type IPasswordProps } from '@/components/ui/password'
import { type IBaseInputFormProps } from '@/types'

export type IPasswordFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> & IPasswordProps
