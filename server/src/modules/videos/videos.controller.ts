import { Router, Request, Response } from 'express'
import os from 'os'
import multer from 'multer'
import fs from 'fs/promises'
import path from 'path'
import VideosRepository from './videos.repository'

const router = Router()

const videosRepo = new VideosRepository()

router.get('/', async (req: Request, res: Response) => {
  const videos = await videosRepo.getAll() 
  return res.json(videos)
})

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body
  const videoId = await videosRepo.create({ name, description, filename: null })
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
    let file = req.file
    try {
      await fs.mkdir(path.join(process.cwd(), 'uploads', video.id))
    } catch (err) {
      // 
    }
    const destination = path.resolve(process.cwd(), `uploads/${video.id}/${file.originalname}`)
    await fs.copyFile(file.path, destination)
    await videosRepo.update(video.id, { filename: file.originalname })
    // await fs.rename(file.path, destination)
    res.status(200).end()
    
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

})

export default router