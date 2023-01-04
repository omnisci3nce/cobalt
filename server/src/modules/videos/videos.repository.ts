import CRUD from '../../lib/crud'
import { Video, VideoDetails, VideoDetailsSchema, VideoSchema, VideoUpdatableFields, VideoUpdatableFieldsSchema } from './video'
import Database from '../../lib/database'

export default class VideosRepository extends CRUD<Video, VideoDetails> {
  constructor(private db: Database) {
    super('public.videos', VideoSchema, VideoDetailsSchema, { uuid: true, softDelete: false }, 'video_id')
  }

  async getOne(id: string) {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE video_id = '${id}'`, [])
    const video = VideoSchema.parse(result.rows[0])
    return video
  }
}