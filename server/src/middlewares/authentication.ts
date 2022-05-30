import { Request, Response, NextFunction } from 'express'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.username) {
    req.session.resetMaxAge()
    next()
  } else {
    res.status(401).end()
  }
}