import createServer from '../_helpers/createServer'

describe('classes API', function () {
  let request
  beforeEach(async function() {
    request = await createServer()
  })

  describe('GET /api/classes', function () {
    it('returns the classes for the user', async function() {
      await request.get('/api/classes?userId=2').expect(
        200,
        [{
          id: 3,
          name: 'Dependency Injection with Awilix'
        }]
      )
    })
  })
})
