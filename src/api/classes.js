import { makeClassInvoker } from 'awilix-koa'

class ClassesAPI {
  constructor ({ classService }) {
    this.classService = classService
  }

  async findClasses (ctx) {
    const classes = await this.classService.find()
    ctx.ok(classes)
  }
}

export default function (router) {
  // Same trick as the functional API, but using `makeClassInvoker`.
  const api = makeClassInvoker(ClassesAPI)

  router.get('/api/classes', api('findClasses'))
}
