import CRUD from '../../lib/crud'
import { Video, VideoDetails, VideoDetailsSchema, VideoSchema, VideoUpdatableFields, VideoUpdatableFieldsSchema } from './video'
import { connect } from '../../database'

export default class VideosRepository extends CRUD<Video, VideoDetails> {
  constructor() {
    super('public.videos', VideoSchema, VideoDetailsSchema, { uuid: true, softDelete: false }, 'video_id')
  }

  async getOne(id: string) {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const result = await db.query(`SELECT * FROM ${this.tableName} WHERE video_id = '${id}'`)
    db.release()
    const user = VideoSchema.parse(result.rows[0])
    return user
  }
}