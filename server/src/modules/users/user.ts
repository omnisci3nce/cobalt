import { z } from 'zod'
import { AuditSchema, SoftDeleteSchema } from '../../lib/common'

// --- Schemas

const ID = z.object({
  user_id: z.string()
})

export const UserUpdatableFieldsSchema = z.object({
  email: z.string().max(80),
})

export const UserNonUpdatableFieldsSchema = z.object({
  username: z.string().max(20),
  encrypted_password: z.string().max(64),
  is_admin: z.boolean()
})

export const UserDetailsSchema = UserNonUpdatableFieldsSchema.merge(UserUpdatableFieldsSchema)

export const UserSchema = ID.merge(UserUpdatableFieldsSchema).merge(UserNonUpdatableFieldsSchema).merge(AuditSchema).merge(SoftDeleteSchema)

// --- Types

export type UserUpdatableFields = z.infer<typeof UserUpdatableFieldsSchema>;
export type UserNonUpdatableFields = z.infer<typeof UserNonUpdatableFieldsSchema>;

export type UserDetails = UserUpdatableFields & UserNonUpdatableFields

export type User = z.infer<typeof UserSchema>
