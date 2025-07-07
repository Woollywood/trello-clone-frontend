import { FieldValues } from 'react-hook-form'

import { ConnectForm } from '@/features/form/ConnectForm'

export const createConnectForm = <
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>() => ConnectForm<TFieldValues, TContext, TTransformedValues>
