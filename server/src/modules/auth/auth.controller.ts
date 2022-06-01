import { Router, Request, Response } from 'express'
import UsersRepository from '../users/users.repository'
import bcrypt from 'bcrypt'
import Logger from '../../lib/logger'

declare module 'express-session' {
  interface SessionData {
    username: string
  }
}

const usersRepo = new UsersRepository()

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await usersRepo.getByUsername(username)
  if (!user) return res.status(500).send('User not found')
  const legit = await bcrypt.compare(password, user.encrypted_password)
  if (legit) {
    req.session.username = req.body.username
    return res.status(200).end()
  } else {
    return res.status(400).send('Incorrect password')
  }
})

router.get('/logout', async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) Logger.error(err)
  })
  res.redirect('/')
})

export default router
