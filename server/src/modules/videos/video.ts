import { z } from 'zod'
import { AuditSchema } from '../../lib/common'

const ID = z.object({
  video_id: z.string()
})

export const VideoUpdatableFieldsSchema = z.object({
  name: z.string().max(100),
  description: z.string(),
  created_by: z.string().nullable()
})
export type VideoUpdatableFields = z.infer<typeof VideoUpdatableFieldsSchema>

export const VideoNonUpdatableFieldsSchema = z.object({
  filename: z.string().nullable(),
})
export type VideoNonUpdatableFields = z.infer<typeof VideoNonUpdatableFieldsSchema>

export const VideoDetailsSchema = VideoNonUpdatableFieldsSchema.merge(VideoUpdatableFieldsSchema)
export type VideoDetails = z.infer<typeof VideoDetailsSchema>

export const VideoSchema = ID
    .merge(VideoUpdatableFieldsSchema)
    .merge(VideoNonUpdatableFieldsSchema)
    .merge(AuditSchema)
export type Video = z.infer<typeof VideoSchema>