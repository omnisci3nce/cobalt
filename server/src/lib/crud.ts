import { connect } from '../database'

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

export default class CRUD<T, D extends Record<string, string | number | null>> implements IRepo<T, D> {
  tableName: string
  schema: Validator<T>
  detailsSchema: Validator<D>
  options: CRUDOptions

  constructor(
    tableName: string,
    schema: Validator<T>,
    detailsSchema: Validator<D>,
    options?: CRUDOptions
  ) {
    this.tableName = tableName
    this.schema = schema
    this.detailsSchema = detailsSchema
    this.options = options ? { ...defaultOptions, ...options } : defaultOptions
  }

  async getAll(): Promise<T[]> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const rows = await db.query(`SELECT * from ${this.tableName};`).then((res) => res.rows)
    return rows.map(row => this.schema.parse(row))
  }

  async getOne(id: string): Promise<T | undefined> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const result = await db.query(`SELECT * from ${this.tableName} WHERE id = ${id}`)
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
    RETURNING id;`, values}
    console.log(query)
    const result = await db.query(query)

    return result.rows[0].id
  }

  async update(id: string, details: Partial<D>): Promise<void> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    const columns = Object.keys(details)
    const values = Object.values(details)

    const query = { text: `
        UPDATE ${this.tableName} SET
          ${Object.keys(details).map((key, i) => {
            return `${key} = '${i + 1}'`
          }).join(', ')}
        WHERE id = ($1)${this.options.uuid && '::uuid'};`,
        values: [id, ...values]
    }
      

    await db.query(query)
  }

  async delete(id: string): Promise<void> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    if (this.options.softDelete) {
      await db.query(`UPDATE ${this.tableName} SET deleted = true WHERE id = ${id}`)
    } else {
      await db.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`)
    }
  }
}
