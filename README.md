# koa-es7-boilerplate

[![Dependency Status](https://david-dm.org/jeffijoe/icebug.svg)](https://david-dm.org/jeffijoe/koa-es7-boilerplate)

A boilerplate for writing beautiful `async-await`-based Koa 2 API's with ES7 using `babel`.

## Setting up shop

Clone this repo and adjust details in `package.json`. Read on to learn how to actually start being productive.

## What's in the package?

* A minimal setup for doing dependency injection
* Auto-loading of API "controllers"
* Helper methods for dynamically discovering modules
* `mocha-sinon-chai` testing, as well as `supertest` for API testing
* Routing with `koa-router`
* Parsing request bodies with `koa-bodyparser`
* [`icebug`](https://github.com/jeffijoe/icebug) for debugging
* `babel` with `es2015` + `stage-1` presets, `transform-runtime` plugin and sourcemaps as well as `babel-polyfill` for `async-await` support
* **Source map support with nice stack traces!**
* `eslint` (+ optional watch-mode) with rules I think are nice, works with ES7 thanks to `babel-eslint`
* Helper methods for setting status + response content - e.g. `ctx.ok()`, `ctx.notFound()`, etc...
* CORS middleware with `kcors`
* `app-module-path` for improving your module importing life
* `nodemon` for development to auto-restart when your files change
* Nifty `npm run` scripts, see next section for details

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-register` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
* `debug`: Runs the app in development mode with `icebug` (a combo of `nodemon` + `node-inspector`).
* `test`: Runs `mocha` tests.
* `test-watch`: Runs `mocha` tests in watch-mode.
* `lint`: Lints the code in `src` and `test` with `eslint`.
* `lint-watch`: Same as above, in watch-mode.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

```bash
npm run test -- --debug
```

*Note the __`--`__ before the actual arguments.*

## Directory structure

The repository root contains config files, e.g. eslint config, gitignore, etc.

* `src`: the actual source for the app goes here. Duh.
  * `api`: API endpoints go here, and are automatically loaded at startup. Please see the section about API endpoints for details.
  * `bin`: files that are usually executed by `npm run` scripts, e.g. starting the server.
  * `lib`: stuff that helps the app start up, e.g. environment, utilities for loading modules, the container implementation, etc.
  * `middleware`: custom app middleware.
  * `services`: application services, this is just to illustrate the dynamic discovery of stuff as described in the composition root section.
* `test`: tests for the source code. You usually want to replicate the source structure.
  * `_helpers`: test helpers

## Dependency injection

To keep things simple, depencency injection works by giving API endpoints (and other things) the possibility to inject the "container" into stuff.

The container is an object that has all dependencies in the system as properties, and it has methods to bind functions to accept the container as the first argument, making them both testable, and easy to use without having to worry about it too much.

Example: An API endpoint needs a service, `someService`. This service is located in `services/someService.js`, and it looks something like this.

```
// First argument is the container,
// then the actual args follow.
//
// This is because we've bound these methods with the container.
// We are exporting the methods so they can be tested
// with mock dependencies.
export async function getStuff({}, someArg) {
  return someArg + ' The answer is 42.';
}

// The function being called when registering services.
export default function (container) {
  // We register the stuff we want to expose.
  // That means when dependents need this service,
  // they must reference it as `someService` in the container.
  container.someService = container.bindAll({
    getStuff
  });
}
```

Notice how the default export is a function with the `container` as the first argument? I refer to this as the *"container registration pattern"*, and this is what will be called by the registration module - more on this later.

The API endpoint `api/awesome.js` needs to use `someService`, but if we just `import`/`require` it, it'll be hard to swap out that implementation for testing. But if we just gave it the dependencies each time we called it, we could give it fake ones for the test! Nice! But.. That means we have to pass the dependencies every time.. Not fun.

Well, that's where the container comes in. The API endpoint looks a little like this:

```
// An API method.
export const getStuff = async ({ someService }, ctx) => {
  // Dependencies are passed in with an object as the first parameter.
  const data = await someService.getStuff('What is the universe?');

  // .ok comes from responseCalls.js middleware.
  return ctx.ok({ data });
};

// The default export is the registration function.
// It gets passed the router, and the container
// which is used to bind the router calls so the container is
// injected into each method. You can use classes here if
// that's what floats your boat.
export default function (router, { bind }) {
  // router is a KoaRouter.
  router
    .get(
      '/api/stuff',
      // bind comes from the container
      bind(getStuff)
    )
}
```

So what's happening here? Well, we bind each method using the container (2nd argument to the default export is the container, but we just need the `bind` method, and therefore use ES6 destructuring), and then register the bound function with the router. But we also export the `getStuff` function, so when we test it, we can give it a fake container with a fake `someService`. Nice!

But notice how we are not calling `someService.getStuff(container, 'args wee')`? That's because `getStuff` was also bound with the container, and so we don't have to worry about it!

### Registering services (dependencies)

So, in order to actually make services available, we have to add them to the container. We do this in `lib/compositionRoot.js` - this is where the registration happens. In the case of `someService`, we've told our super-awesome discovery module that we want to register all modules in the `services` directory.

```
/**
 * The directories that contains modules that
 * conform to the container registration pattern.
 */
const dirsToLoad = [
  'services'
];
```

Please feel free to add more directories to that array - e.g. `repositories`, or what have you.

You can register more stuff in the `getConfiguredContainer` method in the same file.

## API endpoints

API files are auto-loaded on startup. To add a new API endpoint, create a file in the `api` folder.

Each endpoint file must export a default function that looks like this:

```
export default function (router, container) {
}
```

Notice how it takes the router and the container as arguments - this means that each endpoint file gets to decide what routes it wants. Additionally, since we get the container, we can bind our endpoint functions so we can get our dependencies injected.

Notice how the first argument is the container, but I destructured it to just grab what I actually want:

```
export const getStuff = async ({ someService }, ctx) => {
                                 ^^^^^^^^^^^
};
```

## Middleware

Middleware is located in the `middleware` folder. The `responseCalls` middleware can be removed if you don't want it, I personally find it quite nice with helper methods such as:

* `ctx.ok()`
* `ctx.notFound()`
* `ctx.badRequest()`

and so on, check the file for details. Middleware is *not* automatically loaded, and should be installed in `lib/createServer`.

## app-module-path - what?

Basically, instead of `import stuff from '../../../../../lib/stuff'`, you can use `import stuff from 'lib/stuff'`.

# Authors

* Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)
* Jon West - [@ddproxy](https://twitter.com/ddproxy)

# License

MIT.