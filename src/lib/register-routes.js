import { listModules } from 'awilix'

/**
 * Registers routes
 *
 * @param  {KoaRouter} router
 * The router to pass to the API factories.
 */
export function registerRoutes(router) {
  const result = listModules('../routes/*.js', { cwd: __dirname })
  result.forEach(m => require(m.path).default(router))
}
