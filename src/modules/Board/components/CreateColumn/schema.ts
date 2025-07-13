import { z } from 'zod'

import { validationPhrases } from '@/utils/helpers'

export const schema = z.object({
  title: z.string().min(1, validationPhrases.required),
})

export type Schema = z.infer<typeof schema>
