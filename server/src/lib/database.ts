import { Pool, PoolClient, QueryResult } from 'pg'
import 'dotenv/config'

/**
 * Thin abstraction around the `pg` postgres driver to perform
 * common operations like connect and release.
 */
export default class Database {
  private pool: Pool
  
  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
      password: process.env.POSTGRES_PWD || 'postgres',
      port: Number(process.env.DB_PORT || '5432')
    })
  }

  public async query(sql: string, params: any[]): Promise<QueryResult<any>> {
    const client = await this.connect()
    try {
      const result = await client.query(sql, params)
      return result
    } catch (e) {
      throw e
    } finally {
      client.release()
    }
  }

  private async connect(): Promise<PoolClient> {
    return this.pool.connect()
  }

  public disconnect() {
    this.pool.end()
  }
}

let db: Database
export const getDb = () => {
  if (!db) {
    db = new Database()
  }
  return db
}