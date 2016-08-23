import createServer from '../_helpers/createServer'

describe('awesome API', function () {
  let request
  before(async function () {
    request = await createServer()
  })

  describe('GET /api/functional', function () {
    it('returns the answer', async function() {
      await request.get('/api/functional')
        .expect(200, {
          data: 'What is the universe? The answer is 42.',
          testing: true
        })
    })
  })

  describe('GET /not/found', function () {
    it('returns an object with a message', async function() {
      await request.get('/not/found')
        .expect(404, { message: 'Whatever you were looking for, we ain\'t got it, son.' })
    })
  })

  describe('POST /api/functional', function () {
    it('returns whatever was POSTed', async function() {
      await request.post('/api/functional')
        .send({ hello: 'world' })
        .expect(200, {
          youSaid: {
            hello: 'world'
          }
        })
    })
  })
})
