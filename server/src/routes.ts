import authRouter from './modules/auth/auth.controller'
import userRouter from './modules/users/users.controller'
import videoRouter from './modules/videos/videos.controller'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/videos', videoRouter)

export default router