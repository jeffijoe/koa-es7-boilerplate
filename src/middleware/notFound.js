/**
 * The "Not Found" handler.
 *
 * @param  {Koa.Context} ctx
 * The Koa context.
 */
export default function notFoundHandler (ctx) {
  ctx.notFound('Whatever you were looking for, we ain\'t got it, son.')
}
