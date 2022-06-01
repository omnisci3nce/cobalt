import { Router, Request, Response } from 'express'
import VideosRepository from './videos.repository'

const router = Router()

const videosRepo = new VideosRepository()

router.get('/', async (req: Request, res: Response) => {
  const videos = await videosRepo.getAll() 
  return res.json(videos)
})

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const videoId = await videosRepo.create({ name, description })
  return res.json(videoId)
})

/** Upload the actual file for a video entity */
router.post('/:id/upload', async (req: Request, res: Response) => {

})

router.put('/:id', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  await videosRepo.update(req.params.id, { name, description });
  return res.status(200).end()
})

router.delete('/:id', async (req: Request, res: Response) => {

})