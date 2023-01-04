import CRUD from '../../lib/crud'
import { getDb } from '../../lib/database'
import { User, UserDetails, UserDetailsSchema, UserSchema } from './user'

export default class UsersRepository extends CRUD<
  User,
  UserDetails
> {
  constructor() {
    super('public.users', UserSchema, UserDetailsSchema, undefined, 'user_id')
  }

  async getByUsername(username: string): Promise<User> {
    const result = await getDb().query(`SELECT * FROM ${this.tableName} WHERE username = $1`, [username])
    // const user = UserSchema.parse(result.rows[0])
    return result.rows[0]
  }

  async update(id: string, details: { email: string }): Promise<void> {
    const query = {
      text: `
        UPDATE ${this.tableName} SET
          email = $2
        WHERE user_id = $1;`,
      values: [id, details.email]
    }

    await getDb().query(query.text, query.values)
  }

  async updatePassword(id: string, password: string, salt: string): Promise<void> {
    const query = {
      text: `
        UPDATE ${this.tableName} SET
          password = $2,
          salt = $3
        WHERE user_id = $1;`,
      values: [id, password, salt]
    }

    await getDb().query(query.text, query.values)
  }
}
