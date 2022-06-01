import { z } from 'zod'
import { PrimaryKey, AuditSchema, SoftDeleteSchema } from '../../lib/common'

// --- Schemas

export const UserUpdatableFieldsSchema = z.object({
  email: z.string().max(80),
})

export const UserNonUpdatableFieldsSchema = z.object({
  username: z.string().max(20),
  encrypted_password: z.string().max(64),
})

export const UserDetailsSchema = UserNonUpdatableFieldsSchema.merge(UserUpdatableFieldsSchema)

export const UserSchema = PrimaryKey.merge(UserUpdatableFieldsSchema).merge(UserNonUpdatableFieldsSchema).merge(AuditSchema).merge(SoftDeleteSchema)

// --- Types

export type UserUpdatableFields = z.infer<typeof UserUpdatableFieldsSchema>;
export type UserNonUpdatableFields = z.infer<typeof UserNonUpdatableFieldsSchema>;

export type UserDetails = UserUpdatableFields & UserNonUpdatableFields


export type Audit = z.infer<typeof AuditSchema>
export type SoftDelete = z.infer<typeof SoftDeleteSchema>

export type User = z.infer<typeof UserSchema>
