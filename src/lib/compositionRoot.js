import createContainer from './createContainer';
import getModules from './getModules';
import { default as _path } from 'path';

/**
 * The directories that contains modules that
 * conform to the container pattern.
 */
const dirsToLoad = [
  'services'
];

/**
 * Invokes factories in the given path, passing them the specified container.
 *
 * @param  {Object} container The container
 * @param  {String} path      The path to search
 * @return {Promise}          A promise for when we're done.
 */
async function invokeFactoriesIn(container, path) {
  const modules = await getModules(__dirname, _path.join('../', path, '**/*.js'));
  modules.forEach(m =>
    require(m.path).default(container, container.bind)
  );
}

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default async function getConfiguredContainer() {
  const container = createContainer();
  const load = invokeFactoriesIn.bind(null, container);
  await Promise.all(
    dirsToLoad.map(load)
  );
  return container;
}