import app from './server'
import Logger from './lib/logger'

// TODO: on startup make sure uploads folder exists

app.listen(8000, () => {
  Logger.debug('Server is running on port 8000')
})