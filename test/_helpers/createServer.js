/**
 * Files module ensures that we get a single server
 * per run. That means all tests share the same instance.
 *
 * It also ensures that tests do not run until the server is ready.
 */
import agent from 'supertest'
import http from 'http'
import memoize from 'lodash/memoize'
import env from 'lib/env'

import createServer from 'lib/createServer'

let _app, _server
const createTestServer = memoize(async () => {
  env.load('test')
  const app = _app = await createServer()
  _server = http.createServer(
    app.callback()
  )

  await new Promise(
    (resolve, reject) => _server.listen(0, (err) => err ? reject(err) : resolve())
  )

  const req = agent(
    _server
  )

  req.app = app
  return req
})

before(() => {
  return createTestServer()
})

after((done) => {
  if (_app) {
    _server.close(done)
  }
})

export default createTestServer

