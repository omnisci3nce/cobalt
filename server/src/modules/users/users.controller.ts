import { Router, Request, Response } from 'express'
import UsersRepository from './users.repository'
import { z } from 'zod'
import { validateBody } from '../../middlewares/validation'
import bcrypt from 'bcrypt'
// import { authenticate } from '../../middlewares/authentication'

const userParamsSchema = z.object({
  username: z.string().max(20),
  password: z.string().max(20),
  email: z.string().max(80),
})

const router = Router()

const usersRepo = new UsersRepository()

router.get('/', async (req: Request, res: Response) => {
  const users = await usersRepo.getAll()
  return res.json(users)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await usersRepo.getOne(id)
  return res.json(user)
})
router.post('/', validateBody(userParamsSchema), async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const userId = await usersRepo.create({ username, email, encrypted_password: hashedPassword })
  return res.json(userId)
})

router.put('/:id', validateBody(z.object({ email: z.string().max(80) })), async (req: Request, res: Response) => {
  const { email } = req.body
  await usersRepo.update(req.params.id, { email })
  return res.status(200).end()
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await usersRepo.delete(id)
  return res.status(200).end()
})

export default router