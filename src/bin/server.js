import './_bootstrap';
import createServer from 'lib/createServer';
import env from 'lib/env';

const PORT = process.env.PORT || 1338;

createServer().then(app => {
  app.listen(PORT, () => {
    const mode = env.NODE_ENV;
    console.log('Server listening on', PORT, 'in', mode, 'mode');
  });
}, err => {
  console.error(err.stack);
  process.exit(1);
});