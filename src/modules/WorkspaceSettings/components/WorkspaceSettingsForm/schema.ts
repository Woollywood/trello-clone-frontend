import { z } from 'zod'

import { validationPhrases } from '@/utils/helpers'

export const workspaceSettingsSchema = z.object({
  title: z.string().min(1, validationPhrases.required).min(5),
})

export type WorkspaceSettingsSchema = z.infer<
  typeof workspaceSettingsSchema
>
