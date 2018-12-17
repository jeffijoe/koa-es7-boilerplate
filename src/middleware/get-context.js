import { asValue } from 'awilix'

export const getContext = async (ctx, next) => {
  ctx.state.container.register({
    userContext: asValue({
      user: 'username'
    })
  })
  next()
}
