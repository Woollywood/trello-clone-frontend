import { z } from 'zod'

import { validationPhrases } from '@/utils/helpers'

export const signUpSchema = z
  .object({
    username: z.string().min(1, validationPhrases.required).min(3),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    { path: ['confirmPassword'], message: 'Passwords do not match' }
  )

export type SignUpSchema = z.infer<typeof signUpSchema>
