/**
 * HTTP 200 with the given content.
 *
 * @param  {Any} content The content to put in `body`.
 */
function ok(content) {
  this.status = 200;
  this.body = content;
}

/**
 * Sets the status to the given code and returns a JSON
 * body with the given message. Used by other calls.
 *
 * @param  {String} message
 * The message to return.
 *
 * @param  {Number} code
 * The HTTP status code.
 */
function error(message, code = 500) {
  this.status = code;
  this.body = {
    message
  };
}

/**
 * Calls `error` with the given message and a 400 status code.
 *
 * @param  {String} message
 * The message.
 */
function badRequest(message) {
  this.error(message, 400);
}

/**
 * Calls `error` with a predefined message and a 401 status code.
 */
function unauthorized() {
  this.error('You are not authorized.', 401);
}

/**
 * Calls `error` with a predefined message and a 403 status code.
 */
function forbidden() {
  this.error('You are not allowed to do that.', 403);
}

/**
 * Calls `error` with the given message and a 404 status code.
 *
 * @param  {String} message
 * The message.
 */
function notFound(message) {
  this.error(message, 404);
}

/**
 * Adds some nice response calls to our context.
 *
 * @param {Koa.context} ctx
 * The Koa context.
 *
 * @param {Function} next
 * The middleware to call next.
 */
export default async function responseCalls(ctx, next) {
  ctx.ok = ok.bind(ctx);
  ctx.error = error.bind(ctx);
  ctx.badRequest = badRequest.bind(ctx);
  ctx.unauthorized = unauthorized.bind(ctx);
  ctx.forbidden = forbidden.bind(ctx);
  ctx.notFound = notFound.bind(ctx);
  await next();
}