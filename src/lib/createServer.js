import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import cors from 'kcors';
import respond from 'koa-respond';
import createApis from './createApis';
import getConfiguredContainer from './configureContainer';
import bodyParser from 'koa-bodyparser';
import notFoundHandler from 'middleware/notFound';
import containerScope from 'middleware/containerScope';

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async function createServer() {
  const app = new Koa();
  const router = new Router();

  // adds ctx.ok(), ctx.notFound(), etc..
  app.use(respond());
  app.use(convert(cors()));
  app.use(bodyParser());

  // Container is configured with our services and whatnot.
  const container = getConfiguredContainer();

  // Adds middleware that creates a new Container Scope for each request.
  app.use(containerScope(container));

  // Create the API's.
  createApis(router, container);

  // Install routes
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler);

  return app;
}