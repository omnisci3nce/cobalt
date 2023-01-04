import express, { NextFunction, Request, Response, Errback, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import session from 'express-session'
import cors from 'cors'
import routes from './routes'
import { morgan } from './middlewares/logging'
import http from 'http'
import { loadAll } from './loaders'
http.globalAgent.maxSockets = 200


const app = express()
app.use(morgan)
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 30 },
}))
app.use(cors())
app.use(express.json())
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   try {
//     next()
//   } catch (err) {
//     return res.status(500).json({
//         status: false,
//         error: 'Something went wrong'
//     })
//   }
// })
app.use(routes)
app.use('/uploads', express.static('uploads'))

loadAll()

export default app