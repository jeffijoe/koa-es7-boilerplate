import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import cors from 'kcors';
import respond from 'koa-respond';
import createApis from './createApis';
import getConfiguredContainer from './configureContainer';
import bodyParser from 'koa-bodyparser';

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Koa} The configured app.
 */
export default async function createServer() {
  const app = new Koa();
  const router = new Router();

  app.use(respond());
  app.use(convert(cors()));
  app.use(bodyParser());
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Container is configured with our services and whatnot.
  const container = await getConfiguredContainer();
  await createApis(router, container);

  // Default handler when nothing stopped the chain.
  app.use(async (ctx) => {
    ctx.notFound('Whatever you were looking for, we ain\'t got it, son.');
  });

  return app;
}