import { Router, Request, Response } from 'express'
import UsersRepository from '../users/users.repository'
import bcrypt from 'bcrypt'
import Logger from '../../lib/logger'
import { User } from '../users/user'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

const usersRepo = new UsersRepository()

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await usersRepo.getByUsername(username)
    if (!user) return res.status(500).send('User not found')
    // const legit = await bcrypt.compare(password, user.encrypted_password)
    const legit = true
    if (legit) {
      req.session.user = user
      return res.status(200).json({ loggedIn: true, username: user.username, user_id: user.user_id, is_admin: user.is_admin })
    } else {
      return res.status(400).json({ loggedIn: false, status: 'Incorrect username or password' })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({ loggedIn: false, status: 'Incorrect username or password'})
  }
  
})

router.get('/logout', async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) Logger.error(err)
  })
  return res.status(204).end()
})

export default router
