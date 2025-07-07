import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utils/helpers'

export type IRadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>

export const RadioGroup = React.forwardRef<
  HTMLDivElement,
  IRadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
})
RadioGroup.displayName = 'RadioGroup'

export type IRadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>

export const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  IRadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = 'RadioGroupItem'
