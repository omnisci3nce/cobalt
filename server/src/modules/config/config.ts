import { z } from 'zod'

// const ID = z.object({
//   config_id: z.string()
// })

export const ConfigSchema = z.object({
  config_id: z.number(),

  key: z.string(),
  display_name: z.string(),
  type: z.string(),
  default_value: z.string(),

  value: z.string(),

  updated_at: z.date(),
  updated_by: z.string().nullable()
})

export type Config = z.infer<typeof ConfigSchema>