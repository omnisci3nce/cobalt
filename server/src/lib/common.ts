import { z } from 'zod'

export const PrimaryKey = z.object({
  id: z.string()
})

export const AuditSchema = z.object({
  created_at: z.date(),
  updated_at: z.date()
})

export const SoftDeleteSchema = z.object({
  deleted: z.boolean()
})