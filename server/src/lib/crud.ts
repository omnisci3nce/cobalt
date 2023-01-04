import { getDb } from './database';
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
    const rows = await getDb().query(`SELECT * from ${this.tableName};`, []).then((res: any) => res.rows)
    return rows.map((row: any) => this.schema.parse(row))
  }

  async getOne(id: string): Promise<T | undefined> {
    const result = await getDb().query(`SELECT * from ${this.tableName} WHERE ${this.id_col} = ${id}`, [])
    return this.schema.parse(result.rows[0])
  }

  async create(data: D): Promise<number> {
    this.detailsSchema.parse(data)

    const columns = Object.keys(data)
    const values = Object.values(data)

    const query = { text: `
    INSERT INTO ${this.tableName} (${columns.join(', ')})
    VALUES (${values.map((_, i) => '$' + (i+1)).join(',')})
    RETURNING ${this.id_col};`, values}
    Logger.debug(query)
    const result = await getDb().query(query.text, values)

    return result.rows[0][this.id_col]
  }

  async update(id: string, details: Partial<D>): Promise<void> {
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
    
    await getDb().query(query.text, query.values)
  }

  async delete(id: string): Promise<void> {
    if (this.options.softDelete) {
      await getDb().query(`UPDATE ${this.tableName} SET deleted = true WHERE id = ${id}`, [])
    } else {
      await getDb().query(`DELETE FROM ${this.tableName} WHERE ${this.id_col} = ($1)${this.options.uuid && '::uuid'};`, [id])
    }
  }
}
