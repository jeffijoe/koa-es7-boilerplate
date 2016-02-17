import {agent} from 'supertest';
import http from 'http';
import createServer from '../../src/lib/createServer';

export default async () =>
  agent(
    http.createServer(
      (await createServer()).callback()
    )
  );