import CRUD from '../../lib/crud'
import { Video, VideoSchema, VideoUpdatableFields, VideoUpdatableFieldsSchema } from './video'

export default class VideosRepository extends CRUD<Video, VideoUpdatableFields> {
  constructor() {
    super('public.videos', VideoSchema, VideoUpdatableFieldsSchema)
  }
}