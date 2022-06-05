import { connect } from '../../database'
import { Config, ConfigSchema } from './config'

export default class ConfigRepository {
  async getByKey(key: string): Promise<Config> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const result = await db.query({ text: 'SELECT * FROM config WHERE key = $1', values: [key] })
    const config = ConfigSchema.parse(result.rows[0])
    db.release()
    return config 
  }
}