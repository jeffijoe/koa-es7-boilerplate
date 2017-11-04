import { makeInvoker } from 'awilix-koa'

// This will let us use our injected services.
// Basically, we're destructuring a proxy that
// resolves the dependencies.
const api = makeInvoker(({ todoService }) => ({
  findTodos: async ctx => ctx.ok(await todoService.find(ctx.query)),
  getTodo: async ctx => ctx.ok(await todoService.get(ctx.params.id)),
  createTodo: async ctx =>
    ctx.created(await todoService.create(ctx.request.body)),
  updateTodo: async ctx =>
    ctx.ok(await todoService.update(ctx.params.id, ctx.request.body)),
  removeTodo: async ctx =>
    ctx.noContent(await todoService.remove(ctx.params.id))
}))

// Called by `lib/register-routes`
export default function(router) {
  router.get('/todos', api('findTodos'))
  router.get('/todos/:id', api('getTodo'))
  router.post('/todos', api('createTodo'))
  router.patch('/todos/:id', api('updateTodo'))
  router.delete('/todos/:id', api('removeTodo'))
}
