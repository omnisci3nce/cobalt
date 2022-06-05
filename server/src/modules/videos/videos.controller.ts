import { Router, Request, Response } from 'express'
import os from 'os'
import multer from 'multer'
import fs from 'fs/promises'
import path from 'path'
import VideosRepository from './videos.repository'
import Logger from '../../lib/logger'
import { Queue } from 'bullmq'
import { generateThumbnail } from './videos.service'

const videoQueue = new Queue('videos')

const router = Router()

const videosRepo = new VideosRepository()

router.get('/', async (req: Request, res: Response) => {
  const videos = await videosRepo.getAll()
  return res.json(videos)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const video = await videosRepo.getOne(id)
  return res.json(video)
})

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body
  const videoId = await videosRepo.create({ name, description, filename: null, created_by: req.session.user ? req.session.user.user_id : null })
  return res.json(videoId)
})

const upload = multer({ dest: os.tmpdir() })

/** Upload the actual file for a video entity */
router.post('/:id/upload', upload.single('video_file'), async (req: Request, res: Response) => {

  // Check that video with id exists
  const video = await videosRepo.getOne(req.params.id)
  if (!video) {
    throw new Error(`Video with id ${req.params.id} was not found.`)
  }

  if (!req.file) {
    return res.status(400).send('You must provide a video file to upload.')
  }

  try {
    const file = req.file

    try {
      Logger.info(`Creating directory for ${video.video_id}`)
      await fs.mkdir(path.join(process.cwd(), 'uploads', video.video_id))
    } catch (err) {
      // 
    }

    const destination = path.resolve(process.cwd(), `uploads/${video.video_id}/${file.originalname}`)
    Logger.info(`Copying ${file.path} into ${destination}`)
    await fs.copyFile(file.path, destination)
    Logger.info('Updating video entity')
    await videosRepo.update(video.video_id, { filename: file.originalname })

    // thumbnail
    const thumbnail = await generateThumbnail(destination)
    await fs.writeFile(path.resolve(process.cwd(), `uploads/${video.video_id}/thumbnail.png`), new Uint8Array(thumbnail))

    // Logger.info('Kicking off jobs')
    // await videoQueue.add('testJob', { message: 'Ping' })

    return res.status(204).end()
    
  } catch (err) {
    return res.status(500).send(err)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const { name, description } = req.body
  await videosRepo.update(req.params.id, { name, description })
  return res.status(200).end()
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await videosRepo.delete(id)
  return res.status(204).end()
})

/** Search */

interface VideoSearchQueryParams {
  search_query: string;
}

router.get('/search', async (req, res) => {
  
})

export default router