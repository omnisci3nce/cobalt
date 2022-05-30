import userRouter from './modules/users/users.controller'
import authRouter from './modules/auth/auth.controller'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router