import { createContainer, Lifetime } from 'awilix';

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
export default function getConfiguredContainer() {
  const container = createContainer();
  container.loadModules(
    modulesToLoad,
    {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase',
      registrationOptions: {
        lifetime: Lifetime.SCOPED
      }
    }
  );
  return container;
}