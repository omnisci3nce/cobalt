import { z } from 'zod'
import { PrimaryKey, AuditSchema } from '../../lib/common'

export const VideoUpdatableFieldsSchema = z.object({
  name: z.string().max(100),
  description: z.string(),

})
export type VideoUpdatableFields = z.infer<typeof VideoUpdatableFieldsSchema>

export const VideoNonUpdatableFieldsSchema = z.object({
  filename: z.string().nullable(),
})
export type VideoNonUpdatableFields = z.infer<typeof VideoNonUpdatableFieldsSchema>

export const VideoDetailsSchema = VideoNonUpdatableFieldsSchema.merge(VideoUpdatableFieldsSchema)
export type VideoDetails = z.infer<typeof VideoDetailsSchema>

export const VideoSchema = PrimaryKey
    .merge(VideoUpdatableFieldsSchema)
    .merge(VideoNonUpdatableFieldsSchema)
    .merge(AuditSchema)
export type Video = z.infer<typeof VideoSchema>