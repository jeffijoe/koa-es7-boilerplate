const __classes = {
  // User 1's classes.
  1: [{
    id: 1,
    name: 'ES7 for Dummies'
  }, {
    id: 2,
    name: 'Koa 101'
  }],

  // User 2's classes
  2: [{
    id: 3,
    name: 'Dependency Injection with Awilix'
  }]
}

export default class ClassService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
  }

  find () {
    // gets the classes for the authenticated user.
    return Promise.resolve(__classes[this.currentUser.id])
  }
}
