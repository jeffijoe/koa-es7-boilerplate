import { createContainer } from 'awilix';

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  'services/*.js'
];

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default async function getConfiguredContainer() {
  const container = createContainer();
  await container.loadModules(modulesToLoad, { cwd: `${__dirname}/..` });
  return container;
}