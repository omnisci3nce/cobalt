import { Request, Response } from 'express'

type NotificationListener = {
  res: Response,
}
type username = string

class NotificationsService {
  private _clients: Map<username, NotificationListener> = new Map();

  public subscribe(req: Request, res: Response, username: string) {
    this._clients.set(username, { res })

    req.on('close', () => {
      this.unsubscribe(username)
    })
  }

  public publish(username: string, msg: string) {
    this._clients.get(username)?.res.write('Hello')
  }

  public unsubscribe(username: string) {
    this._clients.delete(username)
  }
}


const notificationsSingleton = new NotificationsService()

export default notificationsSingleton