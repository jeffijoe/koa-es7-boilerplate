import { asValue } from 'awilix'

// Register Context helps to add request-specific data to the scope.
export const registerContext = async (ctx, next) => {
  // Imagine some auth middleware somewhere...
  ctx.state.container.register({
    userContext: asValue({
      user: 'username'
    })
  })
  return next()
}
