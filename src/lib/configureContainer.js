import { createContainer, Lifetime } from 'awilix'

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service.
  ['services/*.js', Lifetime.SCOPED]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default function getConfiguredContainer () {
  const container = createContainer()
  container.loadModules(
    modulesToLoad,
    {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase'
    }
  )
  return container
}
