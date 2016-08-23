import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import { scopePerRequest } from 'awilix-koa'
import cors from 'kcors'
import respond from 'koa-respond'
import createApis from './createApis'
import bodyParser from 'koa-bodyparser'

import logger from './logger'
import getConfiguredContainer from './configureContainer'
import notFoundHandler from '../middleware/notFound'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async function createServer () {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  const router = new Router()

  // adds ctx.ok(), ctx.notFound(), etc..
  app.use(respond())
  app.use(convert(cors()))
  app.use(bodyParser())

  // Container is configured with our services and whatnot.
  const container = getConfiguredContainer()

  // Creates an Awilix scope per request. Check out the awilix-koa
  // docs for details: https://github.com/jeffijoe/awilix-koa
  app.use(scopePerRequest(container))

  // Adds middleware that creates a new Container Scope for each request.
  app.use((ctx, next) => {
    // faking authentication just to demo Awilix capabilities
    ctx.state.container.registerValue({
      currentUser: {
        id: ctx.request.query.userId
      }
    })
    return next()
  })

  // Create the API's.
  createApis(router)

  // Install routes
  app.use(router.allowedMethods())
  app.use(router.routes())

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler)

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
