/**
 * Let the user know nothing was found here.
 */
export async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`
  ctx.notFound({
    message: `No endpoint matched your request: ${msg}`
  })
}
