import createServer from '../_helpers/createServer';

describe('awesome API', function() {
  let request;
  before(async function () {
    request = await createServer();
  });

  describe('GET /api/stuff', function() {
    it('returns the answer', function(done) {
      request.get('/api/stuff')
        .expect(200, {
          data: 'What is the universe? The answer is 42.'
        })
        .end(done);
    });
  });
});