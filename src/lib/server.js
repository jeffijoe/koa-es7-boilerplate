import * as http from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import { scopePerRequest } from 'awilix-koa'

import { registerRoutes } from './register-routes'
import { logger } from './logger'
import { configureContainer } from './container'
import { notFoundHandler } from '../middleware/not-found'
import { errorHandler } from '../middleware/error-handler'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  const router = new Router()

  // Top middleware is the error handler.
  app.use(errorHandler)

  // Adds ctx.ok(), ctx.notFound(), etc..
  app.use(respond())

  // Handles CORS.
  app.use(cors())

  // Parses request bodies.
  app.use(bodyParser())

  // Container is configured with our services and whatnot.
  app.container = configureContainer()

  // Creates an Awilix scope per request. Check out the awilix-koa
  // docs for details: https://github.com/jeffijoe/awilix-koa
  app.use(scopePerRequest(app.container))

  // Load API routes into the router.
  registerRoutes(router)

  // Install routes into the Koa app.
  app.use(router.allowedMethods())
  app.use(router.routes())

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler)

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())
  logger.debug('Server created, ready to listen', { scope: 'startup' })
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode does not leak resources.
    logger.debug('Server closing, bye!')
  })
  return server
}
