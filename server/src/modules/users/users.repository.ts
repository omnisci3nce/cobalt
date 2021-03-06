import CRUD from '../../lib/crud'
import { User, UserDetails, UserDetailsSchema, UserSchema } from './user'
import { connect } from '../../database'

export default class UsersRepository extends CRUD<
  User,
  UserDetails
> {
  constructor() {
    super('public.users', UserSchema, UserDetailsSchema, undefined, 'user_id')
  }

  async getByUsername(username: string): Promise<User> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')
    const result = await db.query({ text: `SELECT * FROM ${this.tableName} WHERE username = $1`, values: [username] })
    // const user = UserSchema.parse(result.rows[0])
    db.release()
    return result.rows[0]
  }

  async update(id: string, details: { email: string }): Promise<void> {
    const db = await connect()
    if (!db) throw new Error('Couldnt get db')

    const query = {
      text: `
        UPDATE ${this.tableName} SET
          email = $2
        WHERE user_id = $1;`,
      values: [id, details.email]
    }

    await db.query(query)
    db.release()
  }
}
