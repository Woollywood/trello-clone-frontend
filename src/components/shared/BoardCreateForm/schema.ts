import { z } from 'zod'

import { boardVisibilityEnum } from '@/api/generated'
import { validationPhrases } from '@/utils/helpers'

export const schema = z.object({
  title: z.string().min(1, validationPhrases.required).min(3),
  visibility: z.nativeEnum(boardVisibilityEnum),
})

export type Schema = z.infer<typeof schema>
