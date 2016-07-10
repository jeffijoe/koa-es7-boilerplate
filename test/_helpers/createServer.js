import {agent} from 'supertest';
import http from 'http';
import createServer from '../../src/lib/createServer';
import memoize from 'lodash/memoize';

// Memoized createServer call so it's only created once per run.
export default memoize(async () =>
  agent(
    http.createServer(
      (await createServer()).callback()
    )
  )
);