import { throws } from 'smid'
import TodoService from '../todo-service'

// This test only verify invariants, not interaction with dependencies.
// That is tested with integration tests.
describe('TodoService', () => {
  describe('find', () => {
    it('can find todos', async () => {
      const { service, todos } = setup()
      expect(await service.find()).toEqual(todos)
    })
  })

  describe('get', () => {
    it('throws when not found', async () => {
      const { service, todos } = setup()
      expect((await throws(service.get('nonexistent'))).message).toMatch(
        /not found/
      )

      expect(await service.get('1')).toEqual(todos[0])
    })
  })

  describe('create', () => {
    it('throws when no payload is given', async () => {
      const { service } = setup()
      const err = await throws(service.create())
      expect(err.message).toMatch(/payload/)
    })

    it('throws when title is invalid', async () => {
      const { service } = setup()
      expect((await throws(service.create())).message).toMatch(/payload/)
      expect((await throws(service.create({}))).message).toMatch(/title/)
    })

    it('removes unknown props', async () => {
      const { service } = setup()
      expect(
        await service.create({ title: 'test', removeme: 'please' })
      ).toEqual({
        title: 'test'
      })
    })
  })

  describe('update', () => {
    it('throws when todo does not exist', async () => {
      const { service } = setup()
      expect((await throws(service.update('nonexisting', {}))).message).toMatch(
        /nonexisting/
      )

      await service.update('1', { title: 'hello' })
    })
  })

  describe('remove', () => {
    it('throws when todo does not exist', async () => {
      const { service } = setup()
      expect((await throws(service.remove('nonexisting'))).message).toMatch(
        /nonexisting/
      )

      await service.remove('1')
    })
  })
})

function setup() {
  const todos = [
    { id: '1', title: 'Todo 1', completed: true },
    { id: '2', title: 'Todo 2', completed: false }
  ]
  // Mock store
  const store = {
    find: jest.fn(async () => [...todos]),
    get: jest.fn(async id => todos.find(x => x.id === id)),
    create: jest.fn(async data => ({ ...data })),
    update: jest.fn(async (id, data) => ({ ...data })),
    remove: jest.fn(async id => undefined)
  }
  return { service: new TodoService(store), store, todos }
}
