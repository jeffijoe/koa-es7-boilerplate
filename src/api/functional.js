import env from '../lib/env'
import { makeInvoker } from 'awilix-koa'

/**
 * Makes an object with the API endpoints.
 *
 * @param  {object} options.someService
 * The service.
 *
 * @return {object}
 * The API to be registered.
 */
const makeFunctionalApi = ({ someService }) => {
  // Dependencies are passed in with an object as the first parameter.

  // An API method.
  const getStuff = async (ctx) => {
    const data = await someService.getStuff('What is the universe?')

    // .ok comes from responseCalls.js middleware.
    return ctx.ok({ data, testing: env.TESTING })
  }

  // Another API method
  const postStuff = async (ctx) => {
    // echo back stuff to prove bodyparser works.
    return ctx.ok({ youSaid: ctx.request.body })
  }

  return {
    getStuff,
    postStuff
  }
}

// The default export is the registration function.
// It gets passed the router and uses makeInvoker
// to create route handler middleware.
// For more info, visit the Awilix docs: https://github.com/jeffijoe/awilix
export default function (router) {
  // What's this?
  // This trick lets us construct an API for each request.
  // That means that it may store request-local state.
  const api = makeInvoker(makeFunctionalApi)
  // router is a KoaRouter.
  router
    .get('/api/functional', api('getStuff'))
    .post('/api/functional', api('postStuff'))
}
