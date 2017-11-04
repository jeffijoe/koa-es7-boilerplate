import { apiHelper } from './api-helper'
import { throws } from 'smid'

// TIP: if you have more than a handful of tests here
// in can be beneficial to split them into multiple files for
// test speed.
describe('todos API', () => {
  it('can create todo', async () => {
    const api = await apiHelper()
    const todo = await api.createTodo({
      title: 'Hello',
      completed: false,
      nonexistent: 'nope'
    })

    expect(todo.id).toBeDefined()
    expect(todo.nonexistent).not.toBeDefined()
    expect(todo).toEqual(
      expect.objectContaining({
        title: 'Hello',
        completed: false
      })
    )
  })

  it('can get todo', async () => {
    const api = await apiHelper()
    const created = await api.createTodo({
      title: 'Hello'
    })

    const gotten = await api.getTodo(created.id)
    expect(gotten).toEqual(created)
  })

  it('can remove todo', async () => {
    const api = await apiHelper()
    const created = await api.createTodo({
      title: 'Hello'
    })

    await api.removeTodo(created.id)

    const { response } = await throws(api.getTodo(created.id))
    expect(response.status).toBe(404)
  })

  it('can find todos', async () => {
    const api = await apiHelper()
    const created = await api.createTodo({
      title: 'Hello'
    })

    const result = await api.findTodos()
    expect(result).toContainEqual(created)
  })

  it('can update todo', async () => {
    const api = await apiHelper()
    const created = await api.createTodo({
      title: 'Hello'
    })

    const updated = await api
      .updateTodo(created.id, {
        title: 'World',
        completed: true
      })
      .catch(api.catch)

    expect(updated.id).toBe(created.id)
    expect(updated.title).toBe('World')
    expect(updated.completed).toBe(true)
  })
})
