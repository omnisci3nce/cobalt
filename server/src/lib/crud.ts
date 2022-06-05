import { connect } from '../database'
import Logger from './logger'

export interface IRepo<T, D> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T | undefined>;
  create(data: D): Promise<number>;
  update(id: string, details: D): Promise<void>
  delete(id: string): Promise<void>
}

export interface Validator<T> {
  parse: (obj: T) => T;
}

export interface CRUDOptions {
  softDelete: boolean;
  uuid: boolean;
}
export const defaultOptions: CRUDOptions = {
  softDelete: true,
  uuid: false
}

export default class CRUD<T, D extends Record<string, string | number | boolean | null>> implements IRepo<T, D> {
  tableName: string
  schema: Validator<T>
  detailsSchema: Validator<D>
  id_col = 'id'
  options: CRUDOptions

  constructor(
    tableName: string,
    schema: Validator<T>,
    detailsSchema: Validator<D>,
    options?: CRUDOptions,
    id_col?: string
  ) {
    this.tableName = tableName
    if (id_col) {
      this.id_col = id_col
    }
    this.schema = schema
    this.detailsSchema = detailsSchema
    this.options = options ? { ...defaultOptions, ...options } : defaultOptions
  }

  async getAll(): Promise<T[]> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const rows = await db.query(`SELECT * from ${this.tableName};`).then((res) => res.rows)
    db.release()
    return rows.map(row => this.schema.parse(row))
  }

  async getOne(id: string): Promise<T | undefined> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const result = await db.query(`SELECT * from ${this.tableName} WHERE ${this.id_col} = ${id}`)
    db.release()
    return this.schema.parse(result.rows[0])
  }

  async create(data: D): Promise<number> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    this.detailsSchema.parse(data)

    const columns = Object.keys(data)
    const values = Object.values(data)

    const query = { text: `
    INSERT INTO ${this.tableName} (${columns.join(', ')})
    VALUES (${values.map((_, i) => '$' + (i+1)).join(',')})
    RETURNING ${this.id_col};`, values}
    Logger.debug(query)
    const result = await db.query(query)

    db.release()
    return result.rows[0][this.id_col]
  }

  async update(id: string, details: Partial<D>): Promise<void> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    const columns = Object.keys(details)
    const values = Object.values(details)

    const query = { text: `
        UPDATE ${this.tableName} SET
          ${Object.keys(details).map((key, i) => {
            return `${key} = $${i + 2}`
          }).join(', ')}
        WHERE ${this.id_col} = ($1)${this.options.uuid && '::uuid'};`,
        values: [id, ...values]
    }
    
    console.log(query)

    await db.query(query)
    db.release()

    console.log('Finished update query')
  }

  async delete(id: string): Promise<void> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    if (this.options.softDelete) {
      await db.query(`UPDATE ${this.tableName} SET deleted = true WHERE id = ${id}`)
    } else {
      await db.query({ text: `DELETE FROM ${this.tableName} WHERE ${this.id_col} = ($1)${this.options.uuid && '::uuid'};`, values: [id]})
    }
    db.release()
  }
}
