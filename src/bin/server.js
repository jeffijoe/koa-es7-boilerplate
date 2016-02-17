require('./_babel');
const createServer = require('lib/createServer').default;
const env = require('lib/env');
const PORT = process.env.PORT || 1338;

createServer().then(app => {
  app.listen(PORT, () => {
    const mode = env.prod ? 'production' : 'development';
    console.log('Server listening on', PORT, 'in', mode, 'mode');
  });
}, err => {
  console.error(err.stack);
  process.exit(1);
});