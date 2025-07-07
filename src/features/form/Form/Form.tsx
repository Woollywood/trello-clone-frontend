import React, { useImperativeHandle, useRef } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'

import { type IFormProps, type IFormRef } from './types'

import { Form as UForm } from '@/components/shared/form/Form'

export const FormRoot = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  {
    useFormProps,
    children,
    onSubmit,
    ...props
  }: IFormProps<TFieldValues, TContext, TTransformedValues>,
  ref: React.Ref<IFormRef<TFieldValues, TContext, TTransformedValues>>
) => {
  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm<TFieldValues, TContext, TTransformedValues>(
    useFormProps
  )

  useImperativeHandle(ref, () => ({ ...methods, formRef }), [methods])

  return (
    <UForm {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </UForm>
  )
}

export const Form = React.forwardRef(FormRoot) as <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: IFormProps<TFieldValues, TContext, TTransformedValues> & {
    ref?: React.Ref<
      IFormRef<TFieldValues, TContext, TTransformedValues>
    >
  }
) => ReturnType<typeof FormRoot>
