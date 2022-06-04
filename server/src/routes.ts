import authRouter from './modules/auth/auth.controller'
import userRouter from './modules/users/users.controller'
import videoRouter from './modules/videos/videos.controller'
import notificationsRouter from './modules/notifications/notifications.controller'
import configRouter from './modules/config/config.controller'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/videos', videoRouter)
router.use('/notifications', notificationsRouter)
router.use('/config', configRouter)

export default router