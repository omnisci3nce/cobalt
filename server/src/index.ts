import app from './server'
import Logger from './lib/logger'
import UsersRepository from './modules/users/users.repository'
import bcrypt from 'bcrypt'

// TODO: on startup make sure uploads folder exists

app.listen(8000, async () => {
  Logger.debug('Server is running on port 8000')

  // Check if admin as been configured yet, if not set the initial password and salt for password 'admin'
  const users = new UsersRepository()
  const admin = await users.getByUsername('admin')
  if (!admin) { Logger.warn('default admin account has been deleted' )}
  if (admin.password === '') {
    Logger.info('Setting up initial admin password')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin', salt)
    try {
      await users.updatePassword(admin.user_id, hashedPassword, salt)
    } catch (e) {
      Logger.error('failed to set initial admin password')
      Logger.error(e)
    }
  }
})