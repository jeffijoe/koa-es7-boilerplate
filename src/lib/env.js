import yenv from 'yenv'
import { keyblade } from 'keyblade'
import { logger } from './logger'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

/**
 * We just export what `yenv()` returns.
 * `keyblade` will make sure we don't rely on undefined values.
 */
export const env = keyblade(yenv(), {
  message: key => `[yenv] ${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message)
})
