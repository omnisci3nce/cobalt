import { Router, Request, Response } from 'express'
import service from './notifications.service'

const router = Router()

router.get('/subscribe', async (req: Request, res: Response) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-transform'
  }

  res.writeHead(200, headers)

  if (req.session.username) {
    service.subscribe(req, res, req.session.username)
    return res.status(200).end()
  } else {
    return res.status(401).send('Must be logged in to receive notifications')
  }
})

router.get('/test', async (req: Request, res: Response) => {
  if (req.session.username) {
    service.publish(req.session.username, 'Hello')
  }
})

export default router