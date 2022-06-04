import express, { NextFunction, Request, Response, Errback, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import session from 'express-session'
import cors from 'cors'
import routes from './routes'

import { morgan } from './middlewares/logging'

const app = express()
app.use(cors())
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 30 },
}))
app.use(express.json())
app.use(morgan)
app.use(function(req: Request, res: Response, next: NextFunction) {
  try {
    next()
  } catch (err) {
    res.status(500).json({
        status: false,
        error: 'Something went wrong'
    });

  }


});
app.use('/uploads', express.static('uploads'))
app.use(routes)

export default app