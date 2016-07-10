import glob from 'glob';
import path from 'path';
import { listModules } from 'awilix';

/**
 * Resolves and creates API controllers.
 *
 * @param  {KoaRouter} router
 * The router to pass to the API factories.
 *
 * @param  {Object} container
 * The DI container.
 *
 * @return {Promise}
 * A promise for when we're done.
 */
export default function createApis(router, container) {
  const result = listModules('../api/*.js', { cwd: __dirname });
  result.forEach(
    m => require(m.path).default(router, container)
  );
}