import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import cors from 'kcors';
import responseCalls from '../middleware/responseCalls';
import createApis from './createApis';
import getConfiguredContainer from './compositionRoot';

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Koa} The configured app.
 */
export default async function createServer() {
  const app = new Koa();
  const router = new Router();

  router.get('/', async (ctx) => {
    ctx.notFound('Oh shit');
  });

  app.use(responseCalls);
  app.use(convert(cors()));
  app.use(router.allowedMethods());
  app.use(router.routes());

  const container = await getConfiguredContainer();
  await createApis(router, container);

  app.use(async (ctx) => {
    ctx.notFound('Whatever you were looking for, we ain\'t got it, son.');
  });

  return app;
}