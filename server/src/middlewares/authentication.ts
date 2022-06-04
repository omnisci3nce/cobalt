import { Request, Response, NextFunction } from 'express'
import UsersRepository from '../modules/users/users.repository'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    req.session.resetMaxAge()
    next()
  } else {
    return res.status(401).end()
  }
}

const userIsAdmin = async (userId: string) => {
  const usersRepo = new UsersRepository()
  const user = await usersRepo.getOne(userId)
  if (!user) throw Error('erroneous user id. aborting')

  return user.is_admin
}

// TODO: export const permitOwner = async (req: Request, res: Response, next: NextFunction) => {}

export const permitAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    const isAdmin = await userIsAdmin(req.session.user.user_id) 
    if (isAdmin) {
      next()
    }
  }
  return res.status(401).send('Admin only operation.')
}