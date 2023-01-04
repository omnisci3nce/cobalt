import { getDb } from '../../lib/database'
import { Config, ConfigSchema } from './config'

export default class ConfigRepository {
  async getByKey(key: string): Promise<Config> {
    const result = await getDb().query('SELECT * FROM config WHERE key = $1', [key])
    const config = ConfigSchema.parse(result.rows[0])
    return config 
  }
}