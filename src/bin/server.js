import createServer from '../lib/createServer'
import env from '../lib/env'
import logger from '../lib/logger'

const PORT = env.PORT || 1338

createServer().then(app => {
  app.listen(PORT, () => {
    const mode = env.NODE_ENV
    logger.debug(`Server listening on ${PORT} in ${mode} mode`)
  })
}, err => {
  logger.error('Error while starting up server', err)
  process.exit(1)
})
