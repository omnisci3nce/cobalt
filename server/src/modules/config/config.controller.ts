import { Router } from 'express'
import { authenticate, permitAdmin } from '../../middlewares/authentication'
import ConfigRepository from './config.repository'

const router = Router()

const configRepo = new ConfigRepository()

router.get('/', async (req, res) => {
  return res.status(204).end()
})

router.get('/:key', async (req, res) => {
  const config = await configRepo.getByKey(req.params.key)
  return res.json(config)
})

export default router