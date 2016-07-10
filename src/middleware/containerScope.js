import { asValue } from 'awilix';

/**
 * Makes a middleware that attaches a container scope on the
 * request context.
 *
 * @param  {AwilixContainer} container
 * @return {Function}
 */
export default function makeContainerScopeMiddleware(container) {
  return (ctx, next) => {
    const scope = container.createScope();
    ctx.state.container = scope;

    // faking authentication..
    scope.register({
      currentUser: asValue({
        id: ctx.request.query.userId
      })
    });
    return next();
  };
}