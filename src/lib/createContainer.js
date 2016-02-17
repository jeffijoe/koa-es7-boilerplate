/**
 * Creates a container instance.
 *
 * @return {Object} The container.
 */
export default function createContainer() {
  const container = {};

  // Takes a function and an optional context, returns
  // the bound function.
  container.bind = (fn, ctx = null) => fn.bind(ctx, container);

  // Binds all methods on the given object and returns the object
  // with the bound methods (same as input).
  container.bindAll = obj => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'function') {
        obj[key] = container.bind(value, obj);
      }
    });

    return obj;
  };

  return container;
}