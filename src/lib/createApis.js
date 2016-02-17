import glob from 'glob';
import path from 'path';
import getModules from './getModules';

/**
 * Resolves and creates API controllers.
 *
 * @param  {KoaRouter} router    The router to pass to the API factories.
 * @param  {Object} container    The DI container.
 * @return {Promise}             A promise for when we're done.
 */
export default async function createApis(router, container) {
  const result = await getModules(__dirname, '../api/*.js');
  result.forEach(
    m => require(m.path).default(router, container)
  );
}